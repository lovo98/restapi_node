const { Order, Client, Product } = require("../models/Associations");

exports.addOrder = async (req, res, next) => {
	try {
		const { total, clienteId, productos } = req.body;

		// Verifica que el cliente exista antes de crear la orden
		const cliente = await Client.findByPk(clienteId);
		if (!cliente) {
			return res.status(404).json({ mensaje: "Cliente no encontrado" });
		}

		// Crea la orden con el cliente asociado
		const order = await Order.create({ total, clienteId });

		// Si hay productos, asócialos a la orden
		if (productos && productos.length > 0) {
			// Busca productos por ID
			const productosAsociados = await Product.findAll({
				where: { id: productos }, // Busca productos por ID
			});

			// Asegúrate de que los productos existen
			if (productosAsociados.length !== productos.length) {
				return res
					.status(404)
					.json({ mensaje: "Uno o más productos no encontrados" });
			}
			// Asocia los productos a la orden
			await order.addProducts(productosAsociados);
		}

		res.status(201).json({ mensaje: "Orden creada exitosamente", order });
	} catch (error) {
		console.error("Error al crear la orden:", error);
		res.status(500).json({ mensaje: "Ocurrió un error al guardar la orden" });
		next();
	}
};

exports.listOrders = async(req, res, next) => {
	try {
		const orders = await Order.findAll({
			include: [
				{
					model: Client,
					attributes: ['nombre', 'apellido']
				},
				{
					model: Product,
					attributes: ['nombre', 'precio'],
					through: {
						attributes: []
					}
				}
			]
		})
		res.json(orders)
	} catch (error) {
		res.status(500).json({mensaje: 'Ocurrio un error al mostar las ordenes'})
		next();
	}
}

exports.detailsOrder = async (req, res, next) => {
	const { id } = req.params;
	try {
		const orderDetails = await Order.findOne({where: {id},
			include: [
				{
					model: Client,
					attributes: ['nombre', 'apellido']
				},
				{
					model: Product,
					attributes: ['nombre', 'precio'],
					through: {attributes: []}
				}
			]
	}
)
		if (!orderDetails) {
			res.status(404).json({mensaje: 'La orden no exite'})
		} else {
			res.json(orderDetails);
		}
	} catch (error) {
		res.status(500).json({mensaje: 'Ocurrio un error al obtener detalle de la orden'})
		next()
	}
}

exports.deleteOrder = async (req, res, next) => {
	const { id } = req.params;
	try {
		const order = await Order.destroy({where: {id}});
		if (!order) {
			res.status(404).json({mensaje: 'No se encontro la orden'})
		} else {
			res.json({mensaje: 'Orden eliminada con exito'})
		}
	} catch (error) {
		res.status(500).json({mensaje: 'Ocurrio un error al eliminar la orden'})
		next();
	}
}

exports.updateOrder = async (req, res, next) => {
	const { id } = req.params;
	const { clienteId, productos, ...orderData } = req.body
	try {

		const cliente = await Client.findByPk(clienteId);
		if (!cliente) {
			return res.status(404).json({ mensaje: "Cliente no encontrado" });
		}
		
		const [orderUpdate] = await Order.update(orderData, {where: {id}})
		if (!orderUpdate) {
			res.status(400).json({mensaje: 'La orden no existe'})
		}

		if (clienteId) {
			await Order.update({clienteId}, {where: {id}})
		}

		if (productos && productos.length) {
			const orderP = await Order.findByPk(id);
			await orderP.setProducts(productos)
		}

		res.json({mensaje: 'Orden actualizada con exito'})
	} catch (error) {
		res.status(500).json({mensaje: 'Ocurrio un error al actualizar la orden'})
		next();
	}
}

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
			console.log("productosAsociados", productosAsociados);

			await order.addProducts(productosAsociados);
		}

		res.status(201).json({ mensaje: "Orden creada exitosamente", order });
	} catch (error) {
		console.error("Error al crear la orden:", error);
		res.status(500).json({ mensaje: "Ocurrió un error al guardar la orden" });
		next();
	}
};

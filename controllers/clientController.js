const Client = require('../models/Client')

// add usuer
exports.addClient = async(req, res, next) => {
    try {
        await Client.create(req.body);
        res.json({mensaje: "Se agrego nuevo cliente."})
    } catch (error) {
        res.status(500).json({mensaje: "Ocurrio un error al crear cliente."})
        next();
    }
}

exports.updateClient = async(req, res, next) => {
    const {id} = req.params;
    const dataUpdate = req.body;

    try {
        await Client.update(dataUpdate, {where: {id}})
        if (dataUpdate[0] === 0) {
            return res.status(404).json({ mensaje: "El cliente no fue encontrado." });
          }
          res.json({ mensaje: "Cliente actualizado exitosamente." });
    } catch (error) {
        res.status(500).json({mensaje: "Ocurrio un error al editar el cliente."})
        next();
    }
}

exports.destroyClient = async(req, res, next) => {
    const {id} = req.params;
    try {
        const userDelete = await Client.destroy({where: {id}});
        if(userDelete[0] === 0) {
            return res.status(404).json({ mensaje: "El cliente no fue encontrado." });
        }
        res.json({mensaje: "Cliente eliminado exitosamente."})
    } catch (error) {
        res.status(500).json({mensaje: "Ocurrio un error al eliminar el cliente."})
        next();
    }
}

exports.clients = async(req, res, next) => {
    try {
        const usuario = await Client.findAll();
        res.json(usuario);
    } catch (error) {
        res.status(500).json({mensaje: "Ocurrio un error al listar clientes."})
        next();
    }
}

exports.detailsClient = async(req, res, next) => {
    const {id} = req.params;
    try {
        const usuario = await Client.findOne({where: {id}});
        if (!usuario) {
            return res.status(404).json({mensaje: "El cliente no existe."});
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({mensaje: "Ocurrio un error al obtener el detalle del cliente."});
        next();
    }
}
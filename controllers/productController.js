const Product = require('../models/Product');
const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename:(res, file, cb) => {
            const extension =file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg'  || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no valido.'));
        }
    }
}

const upload = multer(configuracionMulter).single('imagen');

exports.uploadFile = (req, res, next) => {
    upload(req, res, function(error) {
        if (error) {
            res.json({mensjae: error})
        }
        return next();
    })
}

exports.addProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        if (req.file && req.file.filename) {
            await product.update({ imagen: req.file.filename });
        }
        res.json({mensaje: 'Producto creado con exito.'});
    } catch (error) {
        res.status(500).json({mensaje: 'Ocurrio un error al crear producto.'});
        next();
    }
}

exports.products = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({mensaje: 'Ocurrio un error al consultar productos.'});
        next();
    }
}

exports.updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const dataUpdate = req.body;

    try {
        const dataUpdating = await Product.update(dataUpdate, {where: {id}});
        if (dataUpdating[0] === 0){
            res.status(404).json({mensaje: 'El producto no fue encontrado.'})
        }else{
            res.json({mensaje: 'Producto actualizado con exito.'})
        }
    } catch (error) {
        res.status(500).json({mensaje: 'Ocurrio un error al actualizar el producto.'})
        next();
    }
}

exports.destoyProdcut = async (req, res, next) => {
    const {id} = req.params;
    try {
        const destoyProducto = await Product.destroy({where: {id}});
        
        if (!destoyProducto) {
            res.status(400).json({mensaje: 'El producto no fue encontrado'})
        } else {
            res.json({mensaje: "Producto eliminado con exito."})
        }
    } catch (error) {
        res.status(500).json({mensaje: 'Ocurrio un error al eliminar el producto'});
        next();
    }
}

exports.detailsProduct = async (req, res, next) => {
    const {id} = req.params;
    try {
        const details = await Product.findOne({where: {id}})
        if (!details) {
            res.status(404).json({mensaje: 'EL producto no fue encontrado'})
        } else {
            res.json(details);
        }
    } catch (error) {
        res.status(500).json({mensaje: "Ocurrio un error al mostrar detalles"})
        next()
    }
}
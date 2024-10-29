const {DataTypes} = require('sequelize');
const sequelize = require('../db/index');

const Product = sequelize.define('Product', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING
    }
});

module.exports = Product;
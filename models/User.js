const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');

const Usuario = sequelize.define('Usuario', {
  // Definir atributos del modelo
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  // Opciones del modelo
  timestamps: true, // Añade createdAt y updatedAt por defecto
});

module.exports = Usuario;

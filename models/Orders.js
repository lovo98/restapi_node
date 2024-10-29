const { DataTypes } = require("sequelize");
const sequelize = require("../db/index");

const Order = sequelize.define("Orders", {
	total: {
		type: DataTypes.DOUBLE,
	},
	clienteId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: "Clients", // Nombre de la tabla referenciada
			key: "id", // Llave primaria en la tabla referenciada
		},
	},
});

module.exports = Order;

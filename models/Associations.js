// Importa los modelos
const Order = require("./Orders");
const Product = require("./Product");
const Client = require("./Client");

Order.belongsTo(Client, { foreignKey: "clienteId" });
Order.belongsToMany(Product, { through: "orderProduct" });
Product.belongsToMany(Order, { through: "orderProduct" });

// Exportar los modelos relacionados, en caso de que los necesites en otro lugar
module.exports = {
	Order,
	Product,
	Client,
};

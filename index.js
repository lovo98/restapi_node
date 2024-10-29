const express = require("express");
const routers = require("./routers");
const sequelize = require("./db/index");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routers);

// Sincroniza todos los modelos definidos con la base de datos
sequelize
	.sync({ force: false })
	.then(() => {
		console.log("Modelos sincronizados con la base de datos.");
	})
	.catch((err) => {
		console.error("Error al sincronizar los modelos:", err);
	});

app.listen(5001);

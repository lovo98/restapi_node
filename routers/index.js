const express = require("express");
const routerClient = require("./routerClient");
const routerProdcut = require("./routerProduct");
const routerOrder = require("./routerOrders");
const router = express.Router();

router.use("/client", routerClient);
router.use("/product", routerProdcut);
router.use("/order", routerOrder);
module.exports = router;

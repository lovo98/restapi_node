const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

router.post("/add-order", OrderController.addOrder);

module.exports = router;

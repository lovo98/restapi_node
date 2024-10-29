const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

router.post("/add-order", OrderController.addOrder);
router.get('/orders', OrderController.listOrders);
router.get('/details-order/:id', OrderController.detailsOrder);
router.delete('/delete-order/:id', OrderController.deleteOrder);
router.put('/update-order/:id', OrderController.updateOrder)

module.exports = router;

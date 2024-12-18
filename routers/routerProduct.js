const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.post(
	"/add-product",
	productController.uploadFile,
	productController.addProduct
);
router.get("/products", productController.products);
router.put(
	"/update-product/:id",
	productController.uploadFile,
	productController.updateProduct
);
router.delete("/delete-product/:id", productController.destoyProdcut);
router.get("/details-product/:id", productController.detailsProduct);

module.exports = router;

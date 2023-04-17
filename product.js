var express = require('express');
var router = express.Router();
var productController = require("../controllers/productController.js");

router.get('/products', productController.getAll);
router.post('/products', productController.createProduct);

router.get('/product/:productId', productController.getOneProduct);
router.get('/product/:productId', productController.updateProduct);
router.delete('/product/:productId', productController.deleteProduct);

router.param('productId', productController.getByIdProduct);

module.exports = router;
const express = require('express');
const routerClient = require('./routerClient')
const routerProdcut = require('./routerProduct');
const router = express.Router();

router.use('/client', routerClient);
router.use('/product', routerProdcut);
module.exports = router;


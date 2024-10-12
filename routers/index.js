const express = require('express');
const routerClient = require('./routerClient')
const router = express.Router();

router.use('/client', routerClient);
module.exports = router;


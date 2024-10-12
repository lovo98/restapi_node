const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router();

module.exports = function () {
    router.post('/user-add', userController.nuevouser )
    return router;
}


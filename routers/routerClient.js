// routes/routerClient.js
const express = require('express');
const clientController = require('../controllers/clientController');
const router = express.Router();

router.post('/add-client', clientController.addClient);
router.put('/update-client/:id', clientController.updateClient);
router.delete('/delete-client/:id', clientController.destroyClient);
router.get('/clients', clientController.clients);
router.get('/details-client/:id', clientController.detailsClient);

module.exports = router;

const express = require('express');
const router = express.Router();
const warehouse = require('./controller');

// Create new training record
router.post('/create', warehouse.create);

router.put('/update/:warehouseId', warehouse.update);

router.get('/list', warehouse.find);

router.get('/list/shop/:shopId', warehouse.findShop);

router.post('/transfer', warehouse.transfer);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.get('/getBitcoinInfo', controller.BitcoinController.getBitCoinInfo);

module.exports = router;

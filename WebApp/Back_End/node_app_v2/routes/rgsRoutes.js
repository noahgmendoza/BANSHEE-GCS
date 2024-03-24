const express = require('express');
const rgsController = require('../controllers/rgsController.js');

const router = express.Router();

router.post('/details', rgsController.addRGS);
router.put('/voltages', rgsController.updateVoltages);
router.get('/voltages/:location', rgsController.getVoltages);

module.exports = router;

const express = require('express');
const userController = require ('../controllers/userController.js');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
//router.get('/', userController.getAllUsers);
router.post('/details', userController.details);
router.get('/:userID/mavlink_data/:month', userController.getMavlinkData);
router.post('/mavlink_data/:month', userController.uploadMavlinkData);

module.exports = router;


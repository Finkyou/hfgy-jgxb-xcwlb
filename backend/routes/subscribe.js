const express = require('express');
const router = express.Router();
const subscribeController = require('../controllers/subscribeController');

router.post('/', subscribeController.subscribe);
router.get('/all', subscribeController.getAll); // 可加权限

module.exports = router; 
const express = require('express');
const router = express.Router();
const recruitmentController = require('../controllers/recruitmentController');

router.post('/', recruitmentController.apply);
router.get('/all', recruitmentController.getAll); // 可加权限

module.exports = router; 
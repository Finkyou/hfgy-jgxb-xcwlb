const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { authMiddleware, adminMiddleware } = require('../utils/authMiddleware');

router.post('/', authMiddleware, adminMiddleware, newsController.createNews);
router.get('/', newsController.getAllNews);

module.exports = router; 
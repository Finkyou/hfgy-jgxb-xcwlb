const express = require('express');
const router = express.Router();
const submitController = require('../controllers/submitController');
const { authMiddleware } = require('../utils/authMiddleware');

router.post('/', authMiddleware, submitController.submit);
router.get('/my', authMiddleware, submitController.mySubmissions);
// 管理员可审核投稿
router.get('/all', authMiddleware, submitController.allSubmissions);
router.post('/review', authMiddleware, submitController.reviewSubmission);

module.exports = router; 
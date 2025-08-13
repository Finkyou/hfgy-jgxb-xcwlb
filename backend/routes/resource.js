const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const { authMiddleware } = require('../utils/authMiddleware');

router.post('/', authMiddleware, resourceController.apply);
router.get('/my', authMiddleware, resourceController.myApplications);
// 管理员可审批
router.get('/all', authMiddleware, resourceController.allApplications);
router.post('/review', authMiddleware, resourceController.reviewApplication);

module.exports = router; 
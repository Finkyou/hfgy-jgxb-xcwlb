const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot', authController.forgotPassword);
router.get('/users', authMiddleware, adminMiddleware, authController.getUsers);
router.post('/setadmin', authMiddleware, adminMiddleware, authController.setAdmin);
router.post('/changepwd', authMiddleware, authController.changePwd);

module.exports = router; 
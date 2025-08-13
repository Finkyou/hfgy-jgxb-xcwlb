const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ success: false, message: '未登录' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ success: false, message: '登录已过期' });
  }
};

exports.adminMiddleware = async (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: '无管理员权限' });
  next();
}; 
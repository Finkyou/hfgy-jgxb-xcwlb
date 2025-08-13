const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../utils/mailer');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.json({ success: false, message: '请填写完整信息' });
  const exist = await User.findOne({ $or: [{ username }, { email }] });
  if (exist) return res.json({ success: false, message: '用户名或邮箱已存在' });
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hash });
  await user.save();
  res.json({ success: true, message: '注册成功' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.json({ success: false, message: '用户不存在' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ success: false, message: '密码错误' });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ success: true, message: '登录成功', token, username: user.username, role: user.role });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: '邮箱未注册' });
  // 生成临时密码
  const tempPwd = Math.random().toString(36).slice(-8);
  user.password = await bcrypt.hash(tempPwd, 10);
  await user.save();
  // 发送邮件
  await mailer.sendMail({
    to: email,
    subject: '找回密码',
    text: `您的临时密码为：${tempPwd}，请及时登录并修改密码。`
  });
  res.json({ success: true, message: '临时密码已发送至邮箱' });
};

exports.getUsers = async (req, res) => {
  const users = await User.find({}, 'username email role');
  res.json({ success: true, list: users });
};

exports.setAdmin = async (req, res) => {
  const { id } = req.body;
  await User.findByIdAndUpdate(id, { role: 'admin' });
  res.json({ success: true, message: '已设为管理员' });
};

exports.changePwd = async (req, res) => {
  const { newPwd } = req.body;
  if (!newPwd) return res.json({ success: false, message: '新密码不能为空' });
  const hash = await bcrypt.hash(newPwd, 10);
  await User.findByIdAndUpdate(req.user.id, { password: hash });
  res.json({ success: true, message: '密码修改成功' });
}; 
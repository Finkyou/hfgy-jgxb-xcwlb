const Submission = require('../models/Submission');

exports.submit = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.json({ success: false, message: '请填写完整内容' });
  const submission = new Submission({ author: req.user.id, title, content });
  await submission.save();
  res.json({ success: true, message: '投稿成功' });
};

exports.mySubmissions = async (req, res) => {
  const list = await Submission.find({ author: req.user.id }).sort({ createdAt: -1 });
  res.json({ success: true, list });
};

exports.allSubmissions = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: '无权限' });
  const list = await Submission.find().populate('author', 'username').sort({ createdAt: -1 });
  res.json({ success: true, list });
};

exports.reviewSubmission = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: '无权限' });
  const { id, status } = req.body;
  if (!['approved', 'rejected'].includes(status)) return res.json({ success: false, message: '状态错误' });
  await Submission.findByIdAndUpdate(id, { status });
  res.json({ success: true, message: '审核完成' });
}; 
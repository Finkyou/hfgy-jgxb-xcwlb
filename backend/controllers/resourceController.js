const Resource = require('../models/Resource');

exports.apply = async (req, res) => {
  const { content } = req.body;
  if (!content) return res.json({ success: false, message: '请填写申请内容' });
  const resource = new Resource({ applicant: req.user.id, content });
  await resource.save();
  res.json({ success: true, message: '申请已提交' });
};

exports.myApplications = async (req, res) => {
  const list = await Resource.find({ applicant: req.user.id }).sort({ createdAt: -1 });
  res.json({ success: true, list });
};

exports.allApplications = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: '无权限' });
  const list = await Resource.find().populate('applicant', 'username').sort({ createdAt: -1 });
  res.json({ success: true, list });
};

exports.reviewApplication = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: '无权限' });
  const { id, status } = req.body;
  if (!['approved', 'rejected'].includes(status)) return res.json({ success: false, message: '状态错误' });
  await Resource.findByIdAndUpdate(id, { status });
  res.json({ success: true, message: '审批完成' });
}; 
const Recruitment = require('../models/Recruitment');

exports.apply = async (req, res) => {
  const { name, contact, department, reason } = req.body;
  if (!name || !contact || !department) return res.json({ success: false, message: '请填写完整信息' });
  const rec = new Recruitment({ name, contact, department, reason });
  await rec.save();
  res.json({ success: true, message: '报名成功' });
};

exports.getAll = async (req, res) => {
  const list = await Recruitment.find().sort({ createdAt: -1 });
  res.json({ success: true, list });
}; 
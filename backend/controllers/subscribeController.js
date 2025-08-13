const Subscriber = require('../models/Subscriber');

exports.subscribe = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ success: false, message: '请填写邮箱' });
  const exist = await Subscriber.findOne({ email });
  if (exist) return res.json({ success: false, message: '已订阅' });
  const sub = new Subscriber({ email });
  await sub.save();
  res.json({ success: true, message: '订阅成功' });
};

exports.getAll = async (req, res) => {
  const list = await Subscriber.find().sort({ createdAt: -1 });
  res.json({ success: true, list });
}; 
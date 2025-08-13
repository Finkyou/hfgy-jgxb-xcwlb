const News = require('../models/News');
const Subscriber = require('../models/Subscriber');
const mailer = require('../utils/mailer');

exports.createNews = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.json({ success: false, message: '请填写完整内容' });
  const news = new News({ title, content });
  await news.save();
  // 推送给所有订阅者
  const subs = await Subscriber.find();
  for (const sub of subs) {
    await mailer.sendMail({
      to: sub.email,
      subject: '新闻推送',
      text: `${title}\n\n${content}`
    });
  }
  res.json({ success: true, message: '新闻已发布并推送' });
};

exports.getAllNews = async (req, res) => {
  const list = await News.find().sort({ createdAt: -1 });
  res.json({ success: true, list });
}; 
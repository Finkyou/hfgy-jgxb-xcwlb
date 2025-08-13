const mongoose = require('mongoose');

const RecruitmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  department: { type: String, required: true },
  reason: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recruitment', RecruitmentSchema); 
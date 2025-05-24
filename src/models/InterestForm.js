const mongoose = require('mongoose');

const InterestFormSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  participation: {
    type: [String],
    required: true,
  },
  interests: {
    type: [String],
    required: true,
  },
  interestsOther: {
    type: String,
    default: '',
  },
  skills: {
    type: String,
    default: '',
  },
  support: {
    type: String,
    default: '',
  },
  help: {
    type: [String],
    required: true,
  },
  helpOther: {
    type: String,
    default: '',
  },
  joinWhatsApp: {
    type: Boolean,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('InterestFormSchema', InterestFormSchema);

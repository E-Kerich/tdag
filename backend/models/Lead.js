const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    serviceInterest: {
      type: String,
      enum: ['web', 'marketing', 'ai', 'app', 'other'],
      default: 'other'
    },
    source: {
      type: String,
      default: 'website'
    },
    message: String,
    status: {
      type: String,
      enum: ['new', 'contacted', 'active', 'closed'],
      default: 'new'
    },
    notes: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);

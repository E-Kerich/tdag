const mongoose = require('mongoose');

const proofSchema = new mongoose.Schema(
  {
    portfolio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Portfolio',
      required: true
    },
    type: {
      type: String,
      enum: ['image', 'link', 'testimonial', 'document'],
      required: true
    },
    title: String,
    description: String,
    url: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Proof', proofSchema);

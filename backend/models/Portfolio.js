const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      unique: true,
      required: true
    },

    client: String,
    category: { type: String, required: true },
    description: String,
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    outcome: { type: String, required: true },
    liveUrl: String,
    thumbnail: { type: String, required: true },
    tags: [String],
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);
module.exports = mongoose.model('Portfolio', portfolioSchema);
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      required: true
    },
    excerpt: String,
    content: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: [
        'digital-business',
        'web-branding',
        'social-media',
        'ai-for-business',
        'digital-literacy',
        'tech-trends'
      ],
      required: true
    },
    featuredImage: String,
    featured: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft'
    },
    author: {
      type: String,
      default: 'The Digital A-Game'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);

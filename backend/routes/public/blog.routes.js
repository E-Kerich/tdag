const express = require('express');
const router = express.Router();
const {
  getBlogsPublic,
  getBlogBySlug,
  getFeaturedBlogs
} = require('../../controllers/public/blog.controller');

router.get('/', getBlogsPublic);
router.get('/featured', getFeaturedBlogs);
router.get('/:slug', getBlogBySlug);

module.exports = router;

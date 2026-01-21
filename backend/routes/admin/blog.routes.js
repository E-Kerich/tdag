const express = require('express');
const router = express.Router();
const {
  createBlog,
  getBlogsAdmin,
  getBlogAdmin,
  updateBlog,
  deleteBlog
} = require('../../controllers/admin/blog.controller');

const { protect } = require('../../middleware/auth.middleware');

router.use(protect);

router.post('/', createBlog);
router.get('/', getBlogsAdmin);
router.get('/:id', getBlogAdmin);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;

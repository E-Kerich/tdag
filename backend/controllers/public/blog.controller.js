const Blog = require('../../models/Blog');

// @route GET /api/blogs
exports.getBlogsPublic = async (req, res) => {
  const blogs = await Blog.find({ status: 'published' })
    .sort({ createdAt: -1 })
    .select('-content');
  res.json(blogs);
};

// @route GET /api/blogs/:slug
exports.getBlogBySlug = async (req, res) => {
  const blog = await Blog.findOne({
    slug: req.params.slug,
    status: 'published'
  });

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  res.json(blog);
};

// @route GET /api/blogs/featured
exports.getFeaturedBlogs = async (req, res) => {
  const blogs = await Blog.find({
    featured: true,
    status: 'published'
  }).limit(5);
  res.json(blogs);
};

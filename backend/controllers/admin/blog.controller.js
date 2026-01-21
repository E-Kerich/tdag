const Blog = require('../../models/Blog');

// @route POST /api/admin/blogs
exports.createBlog = async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(201).json(blog);
};

// @route GET /api/admin/blogs
exports.getBlogsAdmin = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

// @route GET /api/admin/blogs/:id
exports.getBlogAdmin = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Not found' });
  res.json(blog);
};

// @route PUT /api/admin/blogs/:id
exports.updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(blog);
};

// @route DELETE /api/admin/blogs/:id
exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Blog deleted' });
};

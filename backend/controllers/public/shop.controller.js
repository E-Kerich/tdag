const Product = require("../../models/Product");

// GET all active products
exports.getProducts = async (req, res) => {
  const products = await Product.find({ active: true });
  res.json(products);
};

// GET single product
exports.getProductBySlug = async (req, res) => {
  const product = await Product.findOne({
    slug: req.params.slug,
    active: true
  }).populate("bundleItems");

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

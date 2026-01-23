const Product = require("../../models/Product");

// GET ACTIVE PRODUCTS
exports.getProductsPublic = async (req, res) => {
  const products = await Product.find({ active: true });
  res.json(products);
};

// GET SINGLE PRODUCT
exports.getProductBySlug = async (req, res) => {
  const product = await Product.findOne({
    slug: req.params.slug,
    active: true
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

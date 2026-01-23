const Order = require("../../models/Order");
const Product = require("../../models/Product");
const ShopUser = require("../../models/ShopUser");

// Get purchased products for user
exports.getMyProducts = async (req, res) => {
  const { email } = req.query;

  const user = await ShopUser.findOne({ email }).populate({
    path: "purchases",
    populate: {
      path: "products",
      model: "Product"
    }
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const products = user.purchases.flatMap(order =>
    order.products
  );

  res.json(products);
};

// Secure download access
exports.downloadProduct = async (req, res) => {
  const { email, productId, fileIndex } = req.body;

  const user = await ShopUser.findOne({ email }).populate("purchases");
  if (!user) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const hasAccess = user.purchases.some(order =>
    order.products.includes(productId)
  );

  if (!hasAccess) {
    return res.status(403).json({ message: "No access" });
  }

  const product = await Product.findById(productId);
  const file = product.files[fileIndex];

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  // redirect to Cloudinary (can be signed later)
  res.json({ downloadUrl: file.url });
};

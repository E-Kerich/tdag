const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProductsAdmin,
  updateProduct,
  deleteProduct
} = require("../../controllers/admin/product.controller");
const { protect } = require("../../middleware/auth.middleware");

router.use(protect);

router.post("/", createProduct);
router.get("/", getProductsAdmin);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;

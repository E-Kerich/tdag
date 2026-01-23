const express = require("express");
const router = express.Router();
const {
  getProductsPublic,
  getProductBySlug
} = require("../../controllers/public/product.controller");

router.get("/", getProductsPublic);
router.get("/:slug", getProductBySlug);

module.exports = router;

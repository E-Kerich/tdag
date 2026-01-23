const express = require("express");
const router = express.Router();
const {
  getMyProducts,
  downloadProduct
} = require("../../controllers/public/delivery.controller");

router.get("/my-products", getMyProducts);
router.post("/download", downloadProduct);

module.exports = router;

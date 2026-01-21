const express = require("express");
const router = express.Router();
const {
  getFeaturedPortfolios,
  getPublicPortfolios
} = require("../../controllers/public/portfolio.controller");

router.get("/", getPublicPortfolios);
router.get("/featured", getFeaturedPortfolios);

module.exports = router;

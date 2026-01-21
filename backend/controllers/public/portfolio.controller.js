const Portfolio = require("../../models/Portfolio");

// GET FEATURED PROJECTS
exports.getFeaturedPortfolios = async (req, res) => {
  const items = await Portfolio.find({ featured: true }).sort({ createdAt: -1 });
  res.json(items);
};

// GET ALL (PUBLIC)
exports.getPublicPortfolios = async (req, res) => {
  const items = await Portfolio.find().sort({ createdAt: -1 });
  res.json(items);
};

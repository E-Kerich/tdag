const Portfolio = require("../../models/Portfolio");
const slugify = require("slugify");

// CREATE
exports.createPortfolio = async (req, res) => {
  try {
    const slug = `${slugify(req.body.title, {
      lower: true,
      strict: true
    })}-${Date.now()}`;

    const portfolio = await Portfolio.create({
      ...req.body,
      slug
    });

    res.status(201).json(portfolio);
  } catch (err) {
    console.error("❌ PORTFOLIO CREATE ERROR:", err);
    res.status(400).json({ message: err.message });
  }
};

// READ ALL
exports.getPortfolios = async (req, res) => {
  const items = await Portfolio.find().sort({ createdAt: -1 });
  res.json(items);
};

// READ ONE
exports.getPortfolioById = async (req, res) => {
  const item = await Portfolio.findById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: "Portfolio not found" });
  }
  res.json(item);
};

// UPDATE
exports.updatePortfolio = async (req, res) => {
  const updated = await Portfolio.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// DELETE
exports.deletePortfolio = async (req, res) => {
  await Portfolio.findByIdAndDelete(req.params.id);
  res.json({ message: "Portfolio deleted" });
};

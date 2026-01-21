const Income = require("../../models/Income");

// GET all income
exports.getIncome = async (req, res) => {
  const income = await Income.find().sort({ date: -1 });
  res.json(income);
};

// CREATE income
exports.createIncome = async (req, res) => {
    try {
      const entry = await Income.create(req.body);
      res.status(201).json(entry);
    } catch (error) {
      res.status(400).json({
        message: "Invalid income data",
        error: error.message
      });
    }
  };
  

// DELETE income
exports.deleteIncome = async (req, res) => {
  await Income.findByIdAndDelete(req.params.id);
  res.json({ message: "Income entry removed" });
};

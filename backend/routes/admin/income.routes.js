const express = require("express");
const router = express.Router();
const {
  getIncome,
  createIncome,
  deleteIncome
} = require("../../controllers/admin/income.controller");
const { protect } = require("../../middleware/auth.middleware");

router.use(protect);

router.get("/", getIncome);
router.post("/", createIncome);
router.delete("/:id", deleteIncome);

module.exports = router;

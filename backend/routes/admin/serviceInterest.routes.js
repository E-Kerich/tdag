const express = require("express");
const router = express.Router();
const {
  getServices,
  createService,
  updateService,
  disableService
} = require("../../controllers/admin/serviceInterest.controller");
const { protect } = require("../../middleware/auth.middleware");

router.use(protect);

router.get("/", getServices);
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", disableService);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getDiscoveries,
  getDiscovery,
  updateDiscovery
} = require("../../controllers/admin/webDiscovery.controller");
const { protect } = require("../../middleware/auth.middleware");

router.use(protect);

router.get("/", getDiscoveries);
router.get("/:id", getDiscovery);
router.put("/:id", updateDiscovery);

module.exports = router;

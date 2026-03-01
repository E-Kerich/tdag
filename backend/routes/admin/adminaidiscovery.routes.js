const express = require("express");
const router = express.Router();
const {
  getAllRequests,
  updateStatus
} = require("../../controllers/admin/adminaidiscovery.controller");
const { protect } = require("../../middleware/auth.middleware");

router.use(protect);

router.get("/", getAllRequests);
router.put("/:id", updateStatus);

module.exports = router;

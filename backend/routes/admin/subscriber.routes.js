const express = require("express");
const router = express.Router();
const { getSubscribers } = require("../../controllers/admin/subscribe.controller");
const { protect } = require("../../middleware/auth.middleware");

router.use(protect);
router.get("/", getSubscribers);

module.exports = router;

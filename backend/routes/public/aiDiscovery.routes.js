const express = require("express");
const router = express.Router();
const {
  submitAIDiscovery
} = require("../../controllers/public/aiDiscovery.controller");

router.post("/", submitAIDiscovery);

module.exports = router;

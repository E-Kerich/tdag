const express = require("express");
const router = express.Router();
const {
  createWebDiscovery
} = require("../../controllers/public/webDiscovery.controller");

router.post("/web", createWebDiscovery);

module.exports = router;

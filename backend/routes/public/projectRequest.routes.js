const express = require("express");
const router = express.Router();
const { submitProjectRequest } = require("../../controllers/public/projectRequest.controller");

router.post("/", submitProjectRequest);

module.exports = router;

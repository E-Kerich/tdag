const express = require("express");
const router = express.Router();
const { requestService } = require("../../controllers/public/service.controller");

router.post("/", requestService);

module.exports = router;

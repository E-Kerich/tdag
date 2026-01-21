const express = require('express');
const router = express.Router();
const { sendNewsletter } = require('../../controllers/admin/email.controller');
const { protect } = require('../../middleware/auth.middleware');

router.use(protect);
router.post("/newsletter", protect, sendNewsletter);


module.exports = router;

const express = require('express');
const router = express.Router();
const {
  createLead
} = require('../../controllers/public/contact.controller');

router.post('/', createLead);

module.exports = router;

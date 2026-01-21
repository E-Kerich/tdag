const express = require('express');
const router = express.Router();
const {
  getLeads,
  getLead,
  updateLead,
  deleteLead
} = require('../../controllers/admin/lead.controller');

const { protect } = require('../../middleware/auth.middleware');

router.use(protect);

router.get('/', getLeads);
router.get('/:id', getLead);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

module.exports = router;

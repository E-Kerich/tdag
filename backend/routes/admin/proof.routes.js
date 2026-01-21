const express = require('express');
const router = express.Router();
const {
  createProof,
  getProofsByPortfolio,
  deleteProof
} = require('../../controllers/admin/proof.controller');

const { protect } = require('../../middleware/auth.middleware');

router.use(protect);

router.post('/', createProof);
router.get('/:portfolioId', getProofsByPortfolio);
router.delete('/:id', deleteProof);

module.exports = router;

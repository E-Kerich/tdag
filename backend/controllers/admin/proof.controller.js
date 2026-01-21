const Proof = require('../../models/Proof');

// @route POST /api/admin/proofs
exports.createProof = async (req, res) => {
  const proof = await Proof.create(req.body);
  res.status(201).json(proof);
};

// @route GET /api/admin/proofs/:portfolioId
exports.getProofsByPortfolio = async (req, res) => {
  const proofs = await Proof.find({
    portfolio: req.params.portfolioId
  });
  res.json(proofs);
};

// @route DELETE /api/admin/proofs/:id
exports.deleteProof = async (req, res) => {
  await Proof.findByIdAndDelete(req.params.id);
  res.json({ message: 'Proof removed' });
};

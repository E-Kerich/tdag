const AIDiscovery = require("../../models/AiDiscovery");

// GET /api/admin/ai-discovery
exports.getAllRequests = async (req, res) => {
  const requests = await AIDiscovery.find().sort({ createdAt: -1 });
  res.json(requests);
};

// PUT /api/admin/ai-discovery/:id
exports.updateStatus = async (req, res) => {
  const updated = await AIDiscovery.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(updated);
};

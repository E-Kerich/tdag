const WebDiscovery = require("../../models/WebDiscovery");

// GET ALL
exports.getDiscoveries = async (req, res) => {
  const entries = await WebDiscovery.find()
    .sort({ createdAt: -1 });
  res.json(entries);
};

// GET ONE
exports.getDiscovery = async (req, res) => {
  const entry = await WebDiscovery.findById(req.params.id);
  res.json(entry);
};

// UPDATE STATUS / NOTES
exports.updateDiscovery = async (req, res) => {
  const updated = await WebDiscovery.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

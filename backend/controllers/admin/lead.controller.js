const Lead = require('../../models/Lead');

// @route GET /api/admin/leads
exports.getLeads = async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
};

// @route GET /api/admin/leads/:id
exports.getLead = async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    return res.status(404).json({ message: 'Lead not found' });
  }
  res.json(lead);
};

// @route PUT /api/admin/leads/:id
exports.updateLead = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(lead);
};

// @route DELETE /api/admin/leads/:id
exports.deleteLead = async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: 'Lead removed' });
};

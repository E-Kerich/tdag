const ServiceInterest = require("../../models/Service");

// GET all services
exports.getServices = async (req, res) => {
  const services = await ServiceInterest.find({ active: true });
  res.json(services);
};

// CREATE service
exports.createService = async (req, res) => {
  const service = await ServiceInterest.create(req.body);
  res.status(201).json(service);
};

// UPDATE service
exports.updateService = async (req, res) => {
  const service = await ServiceInterest.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(service);
};

// DELETE (soft)
exports.disableService = async (req, res) => {
  const service = await ServiceInterest.findByIdAndUpdate(
    req.params.id,
    { active: false },
    { new: true }
  );
  res.json(service);
};

const Subscriber = require("../../models/Subscriber");

// @route GET /api/admin/subscribers
exports.getSubscribers = async (req, res) => {
  const subscribers = await Subscriber.find().sort({ createdAt: -1 });
  res.json(subscribers);
};

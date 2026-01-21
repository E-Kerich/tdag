const Subscriber = require('../../models/Subscriber');

// @route POST /api/subscribe
exports.subscribe = async (req, res) => {
  const { email } = req.body;

  const exists = await Subscriber.findOne({ email });
  if (exists) {
    return res.json({ message: 'Already subscribed' });
  }

  await Subscriber.create({ email });
  res.status(201).json({ message: 'Subscribed successfully' });
};

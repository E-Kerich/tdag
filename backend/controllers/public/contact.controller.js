const Lead = require('../../models/Lead');
const sendEmail = require('../../utils/resend');





// @route POST /api/contact
exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json({ message: 'Lead submitted successfully', lead });
  } catch (error) {
    res.status(400).json({ message: 'Failed to submit lead' });
  }

  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: 'New Lead Received',
    html: `
      <h3>New Lead</h3>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Service:</strong> ${lead.serviceInterest}</p>
      <p><strong>Message:</strong> ${lead.message}</p>
    `
  });
};

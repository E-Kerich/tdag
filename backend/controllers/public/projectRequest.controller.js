const sendEmail = require("../../utils/resend");

exports.submitProjectRequest = async (req, res) => {
  const data = req.body;

  // Admin email
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: "New Project Request",
    html: `
      <h3>New Project Request</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company}</p>
      <p><strong>Package:</strong> ${data.package}</p>
      <p><strong>Maintenance:</strong> ${data.maintenance}</p>
      <p><strong>Timeline:</strong> ${data.timeline}</p>
      <p><strong>Description:</strong><br/>${data.description}</p>
    `
  });

  // Client confirmation
  await sendEmail({
    to: data.email,
    subject: "We’ve received your project request",
    html: `
      <p>Hi ${data.name},</p>
      <p>Thank you for reaching out. We’ve received your request for:</p>
      <ul>
        <li><strong>Package:</strong> ${data.package}</li>
        <li><strong>Maintenance:</strong> ${data.maintenance}</li>
      </ul>
      <p>We’ll review your request and get back to you shortly.</p>
      <p>— Digital A-Game</p>
    `
  });

  res.json({ message: "Request submitted" });
};

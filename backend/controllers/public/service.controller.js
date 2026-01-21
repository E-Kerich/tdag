const Lead = require("../../models/Lead");
const sendEmail = require("../../utils/resend");

exports.requestService = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      serviceInterestId,
      message,
      timeline,
      budget
    } = req.body;

    const lead = await Lead.create({
      name,
      email,
      phone,
      serviceInterest: serviceInterestId,
      message,
      timeline,
      budget,
      source: "service-modal"
    });

    // Admin email
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "New Service Request",
      html: `
        <h3>New Service Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "-"}</p>
        <p><strong>Timeline:</strong> ${timeline || "-"}</p>
        <p><strong>Budget:</strong> ${budget || "-"}</p>
        <p><strong>Message:</strong> ${message || "-"}</p>
      `
    });

    // Client confirmation
    await sendEmail({
      to: email,
      subject: "We’ve received your request",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out to <strong>The Digital A-Game</strong>.</p>
        <p>We’ve received your request and will get back to you within 24 hours.</p>
        <p>— Digital A-Game Team</p>
      `
    });

    res.status(201).json({ message: "Request submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit request" });
  }
};

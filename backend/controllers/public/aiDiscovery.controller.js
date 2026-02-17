const AIDiscovery = require("../../models/AIDiscovery");
const sendEmail = require("../../utils/resend");

// POST /api/ai-discovery
exports.submitAIDiscovery = async (req, res) => {
  try {
    const submission = await AIDiscovery.create(req.body);

    // Email to Admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "New AI Discovery Request",
      html: `
        <h2>New AI Discovery Submission</h2>
        <p><strong>Business:</strong> ${submission.businessName}</p>
        <p><strong>Contact:</strong> ${submission.nameAndRole}</p>
        <p><strong>Industry:</strong> ${submission.industry}</p>
        <p><strong>Timeline:</strong> ${submission.timeline}</p>
        <p><strong>Budget:</strong> ${submission.budget}</p>
      `
    });

    // Email to User (confirmation)
    await sendEmail({
      to: req.body.email || req.body.website || process.env.ADMIN_EMAIL,
      subject: "AI Discovery Session – Submission Received",
      html: `
        <p>Hello ${submission.nameAndRole.split(",")[0] || "there"},</p>
        <p>Thank you for submitting your AI Discovery request.</p>
        <p>We’ve received your information and will review it shortly.</p>
        <p>You’ll receive next steps within <strong>24–48 hours</strong>.</p>
        <br/>
        <p>— Digital A-Game</p>
      `
    });

    res.status(201).json({ message: "Submission received", submission });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to submit request" });
  }
};

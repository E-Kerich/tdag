const Subscriber = require("../../models/Subscriber");
const sendEmail = require("../../utils/resend");

exports.sendNewsletter = async (req, res) => {
  const { subject, content, previewText } = req.body;

  if (!subject || !content) {
    return res.status(400).json({ message: "Subject and content are required" });
  }

  const subscribers = await Subscriber.find();

  if (!subscribers.length) {
    return res.status(400).json({ message: "No subscribers found" });
  }

  await Promise.all(
    subscribers.map(sub =>
      sendEmail({
        to: sub.email,
        subject,
        html: `
          ${previewText ? `<p style="color:#6b7280;font-size:14px;"><em>${previewText}</em></p>` : ""}
          ${content}
        `
      })
    )
  );

  res.json({
    message: `Newsletter sent to ${subscribers.length} subscribers`
  });
};

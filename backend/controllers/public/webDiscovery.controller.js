const WebDiscovery = require("../../models/WebDiscovery");
const scoreWebLead = require("../../utils/scoreWebLead");
const sendEmail = require("../../utils/resend");
const { webDiscoveryConfirmation } = require("../../utils/emailTemplates");


// CREATE DISCOVERY ENTRY
exports.createWebDiscovery = async (req, res) => {
  const score = scoreWebLead(req.body);

  const entry = await WebDiscovery.create({
    ...req.body,
    score
  });

  res.status(201).json(entry);
};

exports.createWebDiscovery = async (req, res) => {
    const score = scoreWebLead(req.body);
  
    const entry = await WebDiscovery.create({
      ...req.body,
      score
    });
  
    // 🔥 SEND CONFIRMATION EMAIL
    await sendEmail({
      to: entry.email,
      subject: "We’ve received your Web Discovery submission",
      html: webDiscoveryConfirmation({
        name: entry.name
      })
    });

    await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "New Web Discovery Lead",
        html: `
          <h3>New Discovery Submission</h3>
          <p><strong>Name:</strong> ${entry.name}</p>
          <p><strong>Email:</strong> ${entry.email}</p>
          <p><strong>Budget:</strong> ${entry.budget}</p>
          <p><strong>Score:</strong> ${entry.score}</p>
        `
      });
      
  
    res.status(201).json(entry);
  };
  
const mongoose = require("mongoose");

const webDiscoverySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    organizationType: String,
    location: String,
    industry: String,
    websiteType: String,
    projectType: String,

    features: [String],

    domain: String,
    hosting: String,
    contentReady: String,
    assetsReady: String,

    budget: String,
    timeline: String,

    challenges: String,
    expectations: String,

    // 🔥 Lead intelligence
    score: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["new", "qualified", "proposal", "closed", "rejected"],
      default: "new"
    },

    internalNotes: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("WebDiscovery", webDiscoverySchema);

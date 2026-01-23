const mongoose = require("mongoose");

const aiDiscoverySchema = new mongoose.Schema(
  {
    businessName: String,
    email: String,
    nameAndRole: String,
    website: String,
    industry: String,
    companySize: String,

    operationsAreas: [String],
    frictionAreas: String,
    repetitiveTasks: String,

    currentTools: [String],
    dataStorage: [String],
    usesAI: String,
    aiTools: String,

    aiReasons: [String],
    successDefinition: String,
    aiConcerns: [String],

    timeline: String,
    budget: String,

    expectations: String,
    additionalInfo: String,

    format: String,
    acknowledgement: Boolean,

    status: {
      type: String,
      enum: ["new", "reviewed", "scheduled", "completed"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.AIDiscovery ||
  mongoose.model("AIDiscovery", aiDiscoverySchema);

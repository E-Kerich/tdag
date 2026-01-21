const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,

    serviceInterest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceInterest",
      required: true
    },

    message: String,
    timeline: String,
    budget: String,

    source: {
      type: String,
      default: "website"
    },

    status: {
      type: String,
      enum: ["new", "contacted", "active", "closed"],
      default: "new"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);

const mongoose = require("mongoose");

const serviceInterestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ["web", "marketing", "ai", "app", "other"],
      default: "other"
    },
    description: String,
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceInterest", serviceInterestSchema);

const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    client: {
      type: String,
      required: true
    },
    service: {
      type: String,
      enum: ["web", "marketing", "ai", "app", "other"],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["invoiced", "paid", "overdue", "pending"],
      default: "paid"
    },
    date: {
      type: Date,
      default: Date.now
    },
    notes: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", incomeSchema);

const mongoose = require("mongoose");

const shopUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    purchases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShopUser", shopUserSchema);

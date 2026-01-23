const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      required: true
    },

    shortDescription: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ["digital-tools","ebook", "template", "course", "bundle", "resource-pack"],
      required: true
    },
    price: {
      type: Number,
      required: true
    },

    // COVER IMAGE
    coverImage: {
      type: String,
      required: true
    },

    // DIGITAL FILES
    files: [
      {
        name: String,
        url: String
      }
    ],

    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

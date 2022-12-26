const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "Please enter your name"],
    },
    review: {
      type: String,
      required: [true, "Your review must have text"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);

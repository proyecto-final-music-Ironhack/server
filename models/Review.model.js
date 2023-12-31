const { Schema, model } = require("mongoose");
const User = require("./User.model");
const ReviewSchema = new Schema(
  {
    message: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Review", ReviewSchema);

const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
  message: String,
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  date: Date.now,
});

module.exports = model("Review", ReviewSchema);

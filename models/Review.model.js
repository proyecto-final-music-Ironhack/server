const { Schema, model } = require("mongoose");
const User = require("./User.model");
const ReviewSchema = new Schema({
  message: String,
  nameUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Review", ReviewSchema);

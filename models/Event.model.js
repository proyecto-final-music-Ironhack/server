const { Schema, model } = require("mongoose");

const EventSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  date: {
    type: Date,
    default: Date,
    required: true,
  },
  image: String,
  disco: {
    type: Schema.Types.ObjectId,
    ref: "Disco",
  },
  dj: {
    type: Schema.Types.ObjectId,
    ref: "DJ",
  },
  checks: {
    type: Number,
    default: 0,
  },
  genre: {
    type: String,
    required: [true, "Genre is required."],
  },
  reviews: String,
  drinksWithEntry: Number,
  priceOfEntry: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
});

module.exports = model("Event", EventSchema);

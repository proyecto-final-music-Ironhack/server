const { Schema, model } = require("mongoose");

const EventSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  date: {
    type: Date,
    default: Date.now, // Establecer el valor por defecto como la fecha actual
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
});

module.exports = model("Event", EventSchema);

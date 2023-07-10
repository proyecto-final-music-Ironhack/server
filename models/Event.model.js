const { Schema, model } = require("mongoose");

const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    date: {
      type: Date,
      required: true,
    },
    image: String,
    disco: {
      type: Schema.Types.ObjectId,
      ref: "Disco",
    },
    dj: {
      type: Schema.Types.ObjectId,
      ref: "Dj",
    },
    checks: {
      type: Number,
      default: 0,
    },
    genre: {
      type: String,
      required: [true, "Genre is required."],
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    drinksWithEntry: Number,
    priceOfEntry: {
      type: Number,
      required: true,
    },
    startTime: String,
    playlist: {
      name: String,
      tracks: [{ type: Schema.Types.ObjectId, ref: "Track" }],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Event", EventSchema);

const { Schema, model } = require("mongoose");

const trackSchema = new Schema(
  {
    trackName: {
      type: String,
      required: true,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Track", trackSchema);

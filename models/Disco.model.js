const { Schema, model } = require("mongoose");

const DiscoSchema = new Schema(
  {
    email: String,
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    image: {
      type: String,
      default: "https://i.pinimg.com/564x/09/62/f7/0962f71b0d30d722f0bc5dfe4fc32efe.jpg",
    },
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    idFromAPI: String,
    name: String,
    address: String,
    town: String,
    province: String,
    community: String,
    web: String,
    latitude: String,
    longitude: String,
    followers: {
      type: Number,
      default: 0,
    },
    genre: [
      {
        type: String,
        enum: ["Jazz", "Soul", "Pop", "Rock and Roll", "Techno", "Reggeaton", "Hip Hop/Rap", "Funk", "Metal", "Salsa", "Country"],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Disco", DiscoSchema);

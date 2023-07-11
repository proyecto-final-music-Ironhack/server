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
      default:
        "https://www.comunidad.madrid/sites/default/files/styles/image_style_16_9/public/aud/turismo/dj.jpg?itok=3lOewu3H",
    },
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
        enum: [
          "Jazz",
          "Soul",
          "Pop",
          "Rock and Roll",
          "Techno",
          "Reggeaton",
          "Hip Hop/Rap",
          "Funk",
          "Metal",
          "Salsa",
          "Country",
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Disco", DiscoSchema);

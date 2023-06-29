const { Schema, model } = require("mongoose");

const djSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    image: {
      type: String,
      default:
        "https://www.comunidad.madrid/sites/default/files/styles/image_style_16_9/public/aud/turismo/dj.jpg?itok=3lOewu3H",
    },
    attendedEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    playlists: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
    followers: {
      type: Number,
      default: 0,
    },
    musicGenre: {
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
    notification: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Dj = model("Dj", djSchema);

module.exports = Dj;

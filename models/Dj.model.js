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
      default: "https://i.pinimg.com/564x/f5/bc/a2/f5bca2ce6bdac4cc3df54546cab4194b.jpg",
    },
    attendedEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    playlists: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
    followers: {
      type: Number,
      default: 0,
    },
    musicGenre: [
      {
        type: String,
        enum: ["Jazz", "Soul", "Pop", "Rock and Roll", "Techno", "Reggeaton", "Hip Hop/Rap", "Funk", "Metal", "Salsa", "Country"],
      },
    ],
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

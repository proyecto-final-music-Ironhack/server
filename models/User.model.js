const { Schema, model } = require("mongoose");
const Review = require("./Review.model");

const userSchema = new Schema(
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
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    image: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
    },
    favoriteArtists: [Object],
    attendedEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    savedSongs: [{type: Schema.Types.ObjectId, ref: "Playlist"}],
    notification: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

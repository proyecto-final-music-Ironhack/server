const { Schema, model } = require("mongoose");

const PlaylistSchema = new Schema({
  tacks: [String],
});

module.exports = model("Playlist", PlaylistSchema);

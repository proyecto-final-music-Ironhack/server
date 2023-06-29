const { Schema, model } = require("mongoose");

const DiscoSchema = new Schema({
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
});

module.exports = model("Disco", DiscoSchema);

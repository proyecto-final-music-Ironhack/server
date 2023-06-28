const { Schema, model } = require("mongoose");

const DiscoSchema = new Schema({
  email: String,
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  idFromAPI:String,
  name: String,
  address: String,
  town: String,
  province: String,
  community: String,
  web: String,
  latitude: String,
  longitude: String,
});

module.exports = model("Disco", DiscoSchema);

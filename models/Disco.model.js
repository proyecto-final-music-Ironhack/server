const { Schema, model } = require("mongoose");

const DiscoSchema = new Schema({
  name: String,
  address: String,
  postalCode: String,
  town: String,
  province: String,
  community: String,
  phone: String,
  web: String,
  latitude: String,
  longitude: String,
  activity: String,
  references: String,
  principalActivity: String,
  companyType: String,
  facebook: String,
  idFromAPI: String,
  google_maps: String,
});

module.exports = model("Disco", DiscoSchema);

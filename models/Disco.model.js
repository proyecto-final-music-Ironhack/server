const { Schema, model } = require("mongoose");

const DiscoSchema = new Schema({
  nombre: String,
  direccion: String,
  cp: String,
  municipio: String,
  provincia: String,
  comunidades: String,
  telefono: String,
  web: String,
  LATITUD: String,
  longitud: String,
  actividad: String,
  referencias: String,
  activPrincipal: String,
  tipoEmpresa: String,
  facebook: String,
  id_Brekiadata: String,
  google_maps: String,
});

module.exports = model("Disco", DiscoSchema);

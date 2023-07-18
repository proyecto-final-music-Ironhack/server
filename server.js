const app = require("./app");

const nodemailer = require("nodemailer");
const fs = require("fs"); //es un modulo de Node que nos permite leer archivos

const htmlContent = fs.readFileSync("./email.html", "utf8");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 8080;

let server = app.listen(PORT, "0.0.0.0", function () {
  console.log("App listening on port " + server.address().port);
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  pool: true,
  port: 465,
  secure: true, // Cambiado a true para usar SSL en el puerto 465
  auth: {
    type: "login",
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // SOLO DURANTE DESARROLLO, EN PRODUCCION NECESITAMOS SOLUCIONAR EL PROBLEMA DEL CERTIFICADO
  },
});

const mailOptions = {
  from: "rizzomueye@gmail.com", //tu cuenta de gmail
  to: "cehaso2518@dotvilla.com", //Un ejemplo de correo al que quieres que llegue tu email
  subject: "Correo de prueba desde html",
  html: htmlContent, //texto a enviar
};

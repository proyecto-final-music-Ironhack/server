const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const Dj = require("../models/Dj.model");
const Disco = require("../models/Disco.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const saltRounds = 10;

// POST /auth/signup  - Crea un nuevo usuario en la base de datos
router.post("/signup/:type", (req, res, next) => {
  const { email, password, name, username, idFromAPI } = req.body;
  const { type } = req.params;

  if (email === "" || password === "" || name === "") {
    res.status(400).json({
      message: "Proporciona el correo electrónico, la contraseña y el nombre",
    });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      message: "Proporciona una dirección de correo electrónico válida.",
    });
    return;
  }
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "La contraseña debe tener al menos 6 caracteres y contener al menos un número, una letra minúscula y una letra mayúscula.",
    });
    return;
  }

  if (type == "user") {
    User.findOne({ email })
      .then((foundUser) => {
        if (foundUser) {
          res.status(400).json({ message: "El usuario ya existe." });
          return;
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return User.create({ email, password: hashedPassword, name, username });
      })
      .then((createdUser) => {
        const { email, name, _id, username } = createdUser;
        const user = { email, name, _id, username };
        res.status(201).json(user);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error al crear el usuario" });
      });
  } else if (type === "dj") {
    Dj.findOne({ email })
      .then((foundDj) => {
        if (foundDj) {
          res.status(400).json({ message: "El DJ ya existe." });
          return;
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return Dj.create({ email, password: hashedPassword, name, username });
      })
      .then((createdDj) => {
        const { email, name, _id, username } = createdDj;
        const dj = { email, name, _id, username };
        res.status(201).json(dj);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error al crear el DJ" });
      });
  } else if (type === "disco") {
    Disco.findOne({ idFromAPI })
      .then((foundDisco) => {
        if (!foundDisco) {
          res.status(400).json({
            message:
              "Your club is not registered in our database, please contact with us",
          });
          return;
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Update its info adding email and hashed password

        return Disco.findOneAndUpdate(
          { idFromAPI },
          {
            email,
            password: hashedPassword,
          }
        );
      })
      .then((updatedDisco) => {
        const { email, name, _id, idFromAPI } = updatedDisco;
        const disco = { email, name, _id, idFromAPI };
        res.status(201).json(disco);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error al actualizar la discoteca" });
      });
  } else {
    res.status(400).json({ message: "Tipo especificado no válido." });
  }
});

router.post("/login/:type", (req, res, next) => {
  const { type } = req.params;
  const { password, email } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Provide email and password" });
    return;
  }
  if (type === "user") {
    User.findOne({ email })
      .then((foundUser) => {
        if (!foundUser) {
          res.status(401).json({ message: "User not found." });
          return;
        }
        if (bcrypt.compareSync(password, foundUser.password)) {
          const { _id, email, username } = foundUser;
          const payload = { _id, email, username };
          const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: "6h",
          });
          res.json({ authToken });
        } else {
          res.status(401).json({ message: "Unable to authenticate the user" });
        }
      })
      .catch((err) => next(err));
  } else if (type === "dj") {
    Dj.findOne({ email })
      .then((foundedDj) => {
        if (!foundedDj) {
          res.status(401).json({ message: "User not found." });
          return;
        }
        if (bcrypt.compareSync(password, foundedDj.password)) {
          const { _id, email, username } = foundedDj;
          const payload = { _id, email, username };
          const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: "6h",
          });
          res.json({ authToken });
        } else {
          res.status(401).json({ message: "Unable to authenticate the user" });
        }
      })
      .catch((err) => next(err));
  } else if (type === "disco") {
    Disco.findOne({ email })
      .then((foundedDisco) => {
        if (!foundedDisco) {
          res.status(401).json({ message: "User not found." });
          return;
        }
        if (bcrypt.compareSync(password, foundedDisco.password)) {
          const { _id, email, username } = foundedDisco;
          const payload = { _id, email, username };
          const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: "6h",
          });
          res.json({ authToken });
        } else {
          res.status(401).json({ message: "Unable to authenticate the user" });
        }
      })
      .catch((err) => next(err));
  }
});

// GET  /auth/verify  -  Used to verify JWT stored on the client

router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log(`req.payload`, req.payload);
  res.status(200).json(req.payload);
});

module.exports = router;

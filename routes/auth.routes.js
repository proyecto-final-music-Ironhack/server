const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const Dj = require("../models/Dj.model");
const Disco = require("../models/Disco.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post("/signup/:type", (req, res, next) => {
  const { email, password, name, username, idFromAPI } = req.body;
  const { type } = req.params;

  if (email === "" || password === "" || name === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  // Check the users collection if a user with the same email already exists

  if (type == "user") {
    User.findOne({ email })
      .then((foundUser) => {
        if (foundUser) {
          res.status(400).json({ message: "User already exists." });
          return;
        }
        // If email is unique, proceed to hash the password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        // Create the new user in the database
        return User.create({ email, password: hashedPassword, name, username });
      })
      .then((createdUser) => {
        // Deconstruct the newly created user object to omit the password
        // We should never expose passwords publicly
        const { email, name, _id, username } = createdUser;
        // Create a new object that doesn't expose the password
        const user = { email, name, _id, username };
        res.status(201).json(user);
      });
  } else if (type === "dj") {
    Dj.findOne({ email })
      .then((foundDj) => {
        if (foundDj) {
          res.status(400).json({ message: "Dj already exists." });
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
        // If Disco matches one from our database...
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        console.log('HASHED PASS', hashedPassword);
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
      });
  } else {
    res.status(400).json({ message: "Invalid type specified." });
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
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  console.log(`req.payload`, req.payload);
  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

module.exports = router;

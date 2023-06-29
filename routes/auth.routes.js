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
  const { email, password, name, username } = req.body;
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
        // If email is unique, proceed to hash the password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        // Create the new DJ in the database
        return Dj.create({ email, password: hashedPassword, name, username });
      })
      .then((createdDj) => {
        // Deconstruct the newly created user object to omit the password
        // We should never expose passwords publicly
        const { email, name, _id, username } = createdDj;
        // Create a new object that doesn't expose the password
        const dj = { email, name, _id, username };
        res.status(201).json(dj);
      });
  } else if (type === "disco") {
    Disco.findOne({ email })
      .then((foundDisco) => {
        if (foundDisco) {
          res.status(400).json({ message: "Disco already exists." });
          return;
        }
        // If email is unique, proceed to hash the password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        // Create the new disco in the database
        return Disco.create({
          email,
          password: hashedPassword,
          name,
          username,
        });
      })
      .then((createdDisco) => {
        // Deconstruct the newly created disco object to omit the password
        // We should never expose passwords publicly
        const { email, name, _id, username } = createdDisco;
        // Create a new object that doesn't expose the password
        const disco = { email, name, _id, username };
        res.status(201).json(disco);
      });
  } else {
    res.status(400).json({ message: "Invalid type specified." });
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

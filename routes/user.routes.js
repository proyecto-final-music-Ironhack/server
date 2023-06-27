const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

// GET USER

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    next(err);
  }
});

// EDIT USER

router.put("/:id", async (req, res, next) => {
  try {
    const {id} = req.params
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});
    return res.status(200).json(updatedUser);
  } catch (error) {
    next(err);
  }
});

module.exports = router;

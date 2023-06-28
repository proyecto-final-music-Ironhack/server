const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// GET ALL USERS
router.get("/", userController.list);

// GET ONE USER
router.get("/:id", userController.detail);

// EDIT USER
router.put("/:id", userController.update);

module.exports = router;

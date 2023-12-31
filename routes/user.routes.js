const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// GET ALL USERS
router.get("/", userController.list);

// GET ONE USER
router.get("/user-profile", userController.detail);

// EDIT USER
router.put("/:id", userController.update);

// ADD CHECKED EVENT 
router.put("/check-in/:eventId", userController.checkedEvent)

//POST DELETE USER
router.delete("/:id/delete", userController.delete);

module.exports = router;

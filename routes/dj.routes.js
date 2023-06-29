const express = require("express");
const router = express.Router();
const djController = require("../controllers/dj.controller");

// GET ALL DJs
router.get("/", djController.list);

// GET ONE DJ
router.get("/:id", djController.detail);

// UPDATE DJ
router.put("/:id", djController.update);

// DELETE DJ
router.delete("/:id", djController.delete);

module.exports = router;
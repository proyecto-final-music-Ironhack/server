const express = require("express");
const router = express.Router();
const djController = require("../controllers/dj.controller");

// GET ALL DJs
router.get("/", djController.list);

// GET ONE DJ
router.get("/:id", djController.detail);

// UPDATE DJ
router.put("/:id", djController.update);

//PUT UPDATE FOLLOWERS
router.put("/:id/add-follower", djController.addFollower);
router.put("/:id/remove-follower", djController.removeFollower);

// DELETE DJ
router.delete("/:id", djController.delete);

module.exports = router;

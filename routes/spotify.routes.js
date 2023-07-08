const express = require("express");
const router = express.Router();
const spotifyController = require("../controllers/spotify.controller");

router.get("/playlists", spotifyController.playlists);
router.post("/playlist/:playlistId/:eventId", spotifyController.playlist);
// router.post("/new-track", spotifyController.track);
router.put("/track-like", spotifyController.trackLike);
router.put("/track-dislike", spotifyController.trackDislike);

module.exports = router;

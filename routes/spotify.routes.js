const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Track = require("../models/Track.model");
const Event = require("../models/Event.model");

router.post("/new-track", isAuthenticated, (req, res, next) => {
  const { eventId, trackName } = req.body;

  Track.create({ trackName })
    .then((response) => {
      return Event.findByIdAndUpdate(
        eventId,
        {
          $push: { "playlist.tracks": response._id },
        },
        { new: true }
      );
    })
    .then((response) => res.json({ response }))
    .catch((err) => next(err));
});

router.put("/track-like", isAuthenticated, (req, res, next) => {
  const { _id } = req.payload;
  const { trackId } = req.body;
  Track.findByIdAndUpdate(trackId, { $push: { likes: _id } }, { new: true })
    .then((response) => res.json({ response }))
    .catch((err) => next(err));
});

router.put("/track-dislike", isAuthenticated, (req, res, next) => {
  const { _id } = req.payload;
  const { trackId } = req.body;
  Track.findByIdAndUpdate(trackId, { $pull: { likes: _id } }, { new: true })
    .then((response) => res.json({ response }))
    .catch((err) => next(err));
});



module.exports = router;

const express = require("express");
const router = express.Router();

router.use("/disco", require("./disco.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/events", require("./event.routes"));
router.use("/users", require("./user.routes"));
router.use("/djs", require("./dj.routes"));
router.use("/reviews", require("./review.routes"));

//ROUTES SPOTIFY
// router.use("/spotify", require("./spotify.routes"));
module.exports = router;

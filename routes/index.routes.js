const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();

router.use("/disco", isAuthenticated, require("./disco.routes"));
router.use("/auth", isAuthenticated, require("./auth.routes"));
router.use("/events", isAuthenticated, require("./event.routes"));
router.use("/users", isAuthenticated, require("./user.routes"));
router.use("/djs", isAuthenticated, require("./dj.routes"));
router.use("/reviews", isAuthenticated, require("./review.routes"));

//ROUTES SPOTIFY
// router.use("/spotify", require("./spotify.routes"));
module.exports = router;

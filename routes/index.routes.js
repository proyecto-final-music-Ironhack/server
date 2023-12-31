const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();

router.use("/disco", require("./disco.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/events", isAuthenticated, require("./event.routes"));
router.use("/users", isAuthenticated, require("./user.routes"));
router.use("/djs", isAuthenticated, require("./dj.routes"));
router.use("/reviews", isAuthenticated, require("./review.routes"));
router.use("/spotify", isAuthenticated, require("./spotify.routes"));
router.use("/upload", require("./upload.routes"));
module.exports = router;

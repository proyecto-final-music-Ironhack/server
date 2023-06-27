const express = require("express");
const router = express.Router();

router.use("/disco", require("./disco.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/event", require("./event.routes"));


module.exports = router;

const express = require("express");
const router = express.Router();

router.use("/disco", require("./disco.routes"));
router.use("/auth", require("./auth.routes"));

module.exports = router;

const router = require("express").Router();
const Disco = require("../models/Disco.model");

//GET LIST
router.get("/", async (req, res, next) => {
  try {
    const discoList = await Disco.find();
    return res.status(200).json(discoList);
  } catch (err) {
    next(err);
  }
});

//GET ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const discoId = await Disco.findById(id);
    return res.status(200).json(discoId);
  } catch (err) {
    next(err);
  }
});
module.exports = router;

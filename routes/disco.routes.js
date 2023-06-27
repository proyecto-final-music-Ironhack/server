const router = require("express").Router();
const Disco = require("../models/Disco.model");
const dataDiscos = require("../data.json");

//POST CREATE DISCOS

router.post("/create", async (req, res, next) => {
  try {
    const createDiscos = await Disco.create(dataDiscos);
    return res.status(201).json(createDiscos);
  } catch (err) {
    next(err);
  }
});

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

//PUT UPDATE DISCO

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateDisco = await Disco.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateDisco);
  } catch (err) {
    next(err);
  }
});

// DELETE DISCO
router.delete("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Disco.findByIdAndDelete(id);
    res.status(200).json({ mensage: "Discoteca borrada correctamente" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const Disco = require("../models/Disco.model");
const dataDiscos = require("../data.json");

module.exports.createList = async (req, res, next) => {
  try {
    const createDiscos = await Disco.create(dataDiscos);
    return res.status(201).json(createDiscos);
  } catch (err) {
    next(err);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    if (!req.body.name) return res.status(400).json({ mensage: "Bad request" });
    const disco = await Disco.create(req.body);
    return res.status(201).json(disco);
  } catch (err) {
    next(err);
  }
};

module.exports.list = async (req, res, next) => {
  try {
    const discoList = await Disco.find();
    return res.status(200).json(discoList);
  } catch (err) {
    next(err);
  }
};

module.exports.detail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const discoId = await Disco.findById(id).populate({
      path: "events",
      populate: {
        path: "dj",
      },
    });
    return res.status(200).json(discoId);
  } catch (err) {
    next(err);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateDisco = await Disco.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateDisco);
  } catch (err) {
    next(err);
  }
};

module.exports.addFollower = async (req, res, next) => {
  try {
    const { id } = req.params;
    const disco = await Disco.findByIdAndUpdate(id, { $inc: { followers: 1 } }, { new: true });
    return res.status(200).json({ followers: disco.followers });
  } catch (err) {
    next(err);
  }
};

module.exports.removeFollower = async (req, res, next) => {
  try {
    const { id } = req.params;
    const disco = await Disco.findById(id);
    if (disco && disco.followers > 0) {
      const updatedDisco = await Disco.findByIdAndUpdate(id, { $inc: { followers: -1 } }, { new: true });
      return res.status(200).json({ followers: updatedDisco.followers });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Disco.findByIdAndDelete(id);
    res.status(200).json({ mensage: "Discoteca borrada correctamente" });
  } catch (err) {
    next(err);
  }
};

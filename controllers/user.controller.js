const User = require("../models/User.model");
const Dj = require("../models/Dj.model");
const Disco = require("../models/Disco.model");

module.exports.list = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports.detail = async (req, res, next) => {
  try {
    const { email } = req.payload;

    const user = await User.findOne({email});
    const dj = await Dj.findOne({email});
    const disco = await Disco.findOne({email});

    const foundUser = user || dj || disco;
    return res.status(200).json(foundUser);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (req.file) {
      data.image = req.file.path;
    }
    const updatedUser = await User.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.status(200).json({ mesage: "user deleted" });
  } catch (err) {
    next(err);
  }
};

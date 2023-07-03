const User = require("../models/User.model");
const fileUploader = require('../config/cloudinary.config');

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
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    await fileUploader.single("image")
    const { id } = req.params;
    const data = {...req.body}
    if(req.file) {
      data.image = req.file.path
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

const Dj = require("../models/Dj.model");

module.exports.list = async (req, res, next) => {
  try {
    const allDjs = await Dj.find();
    return res.status(200).json(allDjs);
  } catch (error) {
    next(error);
  }
};

module.exports.detail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dj = await Dj.findById(id);
    return res.status(200).json(dj);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedDj = await Dj.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updatedDj);
  } catch (error) {
    next(error);
  }
};

module.exports.addFollower = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dj = await Dj.findByIdAndUpdate(
      id,
      { $inc: { followers: 1 } },
      { new: true }
    );
    return res.status(200).json({ followers: dj.followers });
  } catch (err) {
    next(err);
  }
};

module.exports.removeFollower = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dj = await Dj.findById(id);
    if (dj && dj.followers > 0) {
      const updatedDj = await Dj.findByIdAndUpdate(
        id,
        { $inc: { followers: -1 } },
        { new: true }
      );
      return res.status(200).json({ followers: updatedDj.followers });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Dj.findByIdAndDelete(id);
    return res.status(200).json({ message: "Dj deleted succesfully" });
  } catch (error) {
    next(error);
  }
};

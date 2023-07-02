const Review = require("../models/Review.model");

module.exports.create = async (req, res, next) => {
  try {
    if (!req.body.nameUser)
      return res.status(400).json({ message: "Bad request" });
    const review = await Review.create(req.body);
    return res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

module.exports.list = async (req, res, next) => {
  try {
    const reviewList = await Review.find();
    return res.status(200).json(reviewList);
  } catch (err) {
    next(err);
  }
};

module.exports.detail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviewId = await Review.findById(id);
    return res.status(200).json(reviewId);
  } catch (err) {
    next(err);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateReview = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateReview);
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: "Review borrado correctamente" });
  } catch (err) {
    next(err);
  }
};

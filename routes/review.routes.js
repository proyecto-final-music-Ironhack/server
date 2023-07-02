const router = require("express").Router();
const Review = require("../models/Review.model");
const reviewController = require("../controllers/review.controller");

//POST CREATE REVIEW
router.post("/create", reviewController.create);

//GET LIST
router.get("/", reviewController.list);

//GET ID
router.get("/:id", reviewController.detail);

//PUT UPDATE REVIEW

router.put("/:id", reviewController.update);

// DELETE REVIEW
router.delete("/:id/delete", reviewController.delete);

module.exports = router;

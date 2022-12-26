const express = require("express");
const Review = require("../reviewModel/reviewModel");
const AppError = require("../util/AppError");
const catchAsync = require("../util/catchAsync");
const router = express.Router();
const createReview = catchAsync(async (req, res, next) => {
  if (!req.body.user)
    return next(new AppError("You must enter your name", 404));
  if (!req.body.review)
    return next(new AppError("Your review must have text", 404));
  const data = await Review.create(req.body);
  res.status(200).json({
    status: "success",
    data,
  });
});
const getAllReviews = catchAsync(async (req, res, next) => {
  let query = Review.find();
  query = query.sort("-createdAt");
  const data = await query;

  res.status(200).json({
    status: "success",
    data,
  });
});
router.route("/").get(getAllReviews).post(createReview);

module.exports = router;

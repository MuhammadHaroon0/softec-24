const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("../controllers/handlerFactory");

const { ratingModel } = require("../models/ratingModel");

const {
  getUserRatings,
  addUserRatings,
} = require("../controllers/ratingController"); //get a single course ratings

const { protect, restriction } = require("../controllers/authController");

router
  .route("/")
  .get(getAll(ratingModel))
  .post(protect, restriction("Fitness Enthusiast"), addUserRatings);

router.route("/getUserRatings/:userId").get(getUserRatings);

router
  .route("/:id")
  .get(getOne(ratingModel))
  .put(protect, restriction("Fitness Enthusiast"), updateOne(ratingModel))
  .delete(protect, restriction("Fitness Enthusiast"), deleteOne(ratingModel));

module.exports = router;

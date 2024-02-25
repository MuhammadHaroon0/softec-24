const express = require("express");
const router = express.Router();
const {
    getAll,
    getOne,
    updateOne,
    deleteOne,
} = require("../controllers/handlerFactory");
const workoutModel = require("../models/workoutModel");
const { protect } = require("../controllers/authController");
const { addworkout } = require("../controllers/workoutController");

router
    .route("/")
    .get(getAll(workoutModel))
    .post(protect, addworkout);
router
    .route("/:id")
    .get(getOne(workoutModel))
    .put(protect, updateOne(workoutModel))
    .delete(protect, deleteOne(workoutModel));

module.exports = router
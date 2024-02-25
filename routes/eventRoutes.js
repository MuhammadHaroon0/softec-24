const express = require("express");
const router = express.Router();
const {
    getAll,
    getOne,
    updateOne,
    deleteOne,
    createOne,
} = require("../controllers/handlerFactory");
const { protect, restriction } = require("../controllers/authController");
const eventModel = require("../models/eventModel");

router
    .route("/")
    .get(getAll(eventModel))
    .post(protect, restriction("Fitness Professional"), createOne(eventModel));
router
    .route("/:id")
    .get(getOne(eventModel))
    .put(protect, restriction("Fitness Professional"), updateOne(eventModel))
    .delete(protect, restriction("Fitness Professional"), deleteOne(eventModel));

module.exports = router
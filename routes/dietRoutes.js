const express = require("express");
const router = express.Router();
const {
    getAll,
    getOne,
    updateOne,
    deleteOne,
} = require("../controllers/handlerFactory");
const dietModel = require("../models/dietModel");
const { protect } = require("../controllers/authController");
const { addDiet } = require("../controllers/dietContoller");

router
    .route("/")
    .get(getAll(dietModel))
    .post(protect, addDiet);
router
    .route("/:id")
    .get(getOne(dietModel))
    .put(protect, updateOne(dietModel))
    .delete(protect, deleteOne(dietModel));

module.exports = router
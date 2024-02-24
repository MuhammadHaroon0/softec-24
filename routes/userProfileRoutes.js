const express = require("express");
const router = express.Router();
const {
    updateOne,
    getOne,
    getAll,
    createOne,
    deleteOne
} = require("../controllers/handlerFactory");
const userProfileModel = require("../models/userProfileModel");
const { updateMe, uploadUserImage, resizeUserImage } = require("../controllers/userProfileController");
const { uploadToCloudinary } = require("../utils/cloudinary");
const { protect } = require("../controllers/authController");


router
    .route("/")
    .get(protect, getAll(userProfileModel))
    .post(protect, createOne(userProfileModel))
router
    .route("/:id")
    .get(protect, getOne(userProfileModel))
    .patch(protect, uploadUserImage, resizeUserImage, uploadToCloudinary, updateMe);


module.exports = router;

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
const { updateMe, uploadUserImage, resizeUserImage, createProfile, addFollowers, deleteFollowers } = require("../controllers/userProfileController");
const { uploadToCloudinary } = require("../utils/cloudinary");
const { protect } = require("../controllers/authController");


router
    .route("/")
    .get(protect, getAll(userProfileModel))
    .post(protect, createProfile)
router.
    route("/addFollower").
    post(protect, addFollowers)
router.
    route("/deleteFollower").
    post(protect, deleteFollowers)
router
    .route("/:id")
    .get(protect, getOne(userProfileModel))
    .patch(protect, uploadUserImage, resizeUserImage, uploadToCloudinary, updateMe);


module.exports = router;

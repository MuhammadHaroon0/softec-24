const express = require("express");
const router = express.Router();
const {
    getOne,
    updateOne,
} = require("../controllers/handlerFactory");
const postModel = require("../models/postModel");
const { protect } = require("../controllers/authController");
const { getPosts, addPost, deletePost, resizePostImage } = require("../controllers/postController");
const { uploadUserImage } = require("../controllers/userProfileController");
const { postUploadToCloudinary } = require("../utils/cloudinary");

router
    .route("/")
    .get(protect, getPosts)
    .post(protect, uploadUserImage, resizePostImage, postUploadToCloudinary, addPost);
router
    .route("/:id")
    .get(getOne(postModel))
    .put(protect, updateOne(postModel))
    .delete(protect, deletePost);

module.exports = router
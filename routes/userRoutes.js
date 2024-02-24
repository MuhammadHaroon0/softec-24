const express = require("express");
const router = express.Router();
const {
  updateOne,
  getOne,
  deleteOne,
  createOne,
} = require("../controllers/handlerFactory");

const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restriction,
} = require("../controllers/authController");

const {
  getAllUsers,
  deleteMe,
  updateMe,
  uploadUserImage,
  resizeUserImage,
} = require("../controllers/userController");

const userModel = require("../models/userModel");

router.post("/signup", signUp);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:resetToken", resetPassword);
router.patch("/updatePassword", protect, updatePassword);

router
  .route("/")
  .get(protect, getAllUsers)
  .post(protect, createOne(userModel))
  .delete(protect, deleteMe)

router
  .route("/:id")
  .get(getOne(userModel, "userProfile"))
  .delete(protect, deleteOne(userModel));

module.exports = router;

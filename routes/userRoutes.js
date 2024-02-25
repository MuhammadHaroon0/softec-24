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
  verify,
} = require("../controllers/authController");

const {
  getAllUsers,
  deleteMe,
  updateMe,
  uploadUserImage,
  resizeUserImage,
  deleteUser,
  searchUser,
  addFollowers,
  deleteFollowers,
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
  .route("/deleteUser")
  .delete(protect, deleteUser);
router.
  route("/verify/:token").
  get(verify)

router.
  route("/search/:letter").
  post(protect, searchUser)

router.
  route("/verify/:token").
  post(verify)

router
  .route("/:id")
  .get(getOne(userModel, "userProfile"))

module.exports = router;

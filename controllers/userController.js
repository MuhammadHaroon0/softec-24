const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const userModel = require("../models/userModel");
const Response = require("../utils/serverResponse");
const { imageMulter } = require("./../utils/multerConfig");
const Email = require("../utils/email");
const sharp = require("sharp");

const APIFeatures = require("./../utils/apiFeatures");
const userProfileModel = require("../models/userProfileModel");
const dietModel = require("../models/dietModel");
const workoutModel = require("../models/workoutModel");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  let doc = new APIFeatures(
    userModel.find({ isActive: { $ne: false } }),
    req.query
  )
    .filter()
    .sort()
    .paginate()
    .limitFields();
  doc = await doc.query;

  return res.status(200).json(new Response("success", doc));
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  let user = await userModel.findById(req.user.id).populate("userProfile")

  if (user.userProfile && user.userProfile.diet && user.userProfile.diet.length > 0) {
    // Get the diet IDs from userProfile
    const dietIds = user.userProfile.diet;

    // Delete the diet documents
    await dietModel.deleteMany({ _id: { $in: dietIds } });
  }
  if (user.userProfile && user.userProfile.workout && user.userProfile.workout.length > 0) {
    const workoutIds = user.userProfile.workout;
    await workoutModel.deleteMany({ _id: { $in: workoutIds } });
  }
  await userProfileModel.deleteOne({ _id: user.userProfile });
  const doc = await userModel.findByIdAndDelete(req.user.id)

  if (doc.deletedCount < 1) {
    return next(new AppError("Document not found matching this id!", 404));
  }
  return res.status(204).json(new Response("success", doc));
})

exports.searchUser = catchAsync(async (req, res, next) => {
  console.log(
    "as"
  );
  const users = await userModel.find({
    _id: { $ne: req.user.id }, // Exclude user's own ID
    name: { $regex: `^${req.params.letter}`, $options: 'i' }
  })
    .limit(10)
    .populate("userProfile");

  return res.status(200).json(new Response("success", users));
})


exports.deleteMe = catchAsync(async (req, res, next) => {
  const doc = await userModel.findByIdAndUpdate(
    req.user.id,
    { active: false },
    { new: true }
  );
  return res.status(204).json({
    status: "success",
    data: {
      doc,
    },
  });
});


const workoutModel = require("../models/workoutModel");
const userModel = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const Response = require("../utils/serverResponse");

exports.addworkout = catchAsync(async (req, res, next) => {
    const newworkout = await workoutModel.create(req.body);
    const user = await userModel.findById(req.user.id).populate("userProfile")
    user.userProfile.workout.push(newworkout._id);
    await user.userProfile.save();
    // console.log(newSection._id);
    return res.status(200).json(new Response("success", newworkout));
});

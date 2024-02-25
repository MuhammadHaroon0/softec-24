const dietModel = require("../models/dietModel");
const userModel = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const Response = require("../utils/serverResponse");

exports.addDiet = catchAsync(async (req, res, next) => {
    const newDiet = await dietModel.create(req.body);
    const user = await userModel.findById(req.user.id).populate("userProfile")
    user.userProfile.diet.push(newDiet._id);
    await user.userProfile.save();
    // console.log(newSection._id);
    return res.status(200).json(new Response("success", newDiet));
});

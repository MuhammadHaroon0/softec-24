const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const userModel = require("../models/userModel");
const Response = require("../utils/serverResponse");
const { imageMulter } = require("./../utils/multerConfig");
const Email = require("../utils/email");
const sharp = require("sharp");

const APIFeatures = require("./../utils/apiFeatures");
const userProfileModel = require("../models/userProfileModel");

exports.getAllUsers = catchAsync(async (req, res, next) => {

});



exports.updateMe = catchAsync(async (req, res, next) => {
    if (req.file) req.body.image = req.file.fileName;
    const doc = await userModel.findById(req.user.id)
    console.log(doc.userProfile);
    return res.status(200).json({
        status: "success",
        data: {
            doc,
        },
    });
});

exports.uploadUserImage = imageMulter.single("image");

exports.resizeUserImage = catchAsync(async (req, res, next) => {
    // console.log(req.file.buffer);
    if (!req.file) return next();

    req.file.buffer = await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toBuffer()
    // .toFile(`public/images/users/${req.file.fileName}`);
    next();
});


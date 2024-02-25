const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const userModel = require("../models/userModel");
const Response = require("../utils/serverResponse");
const { imageMulter } = require("./../utils/multerConfig");
const Email = require("../utils/email");
const sharp = require("sharp");

const APIFeatures = require("./../utils/apiFeatures");
const userProfileModel = require("../models/userProfileModel");

exports.createProfile = catchAsync(async (req, res, next) => {
    const newProfile = await userProfileModel.create(req.body)
    if (req.body.certifications) {
        req.body.certifications = JSON.parse(req.body.certifications);
    }
    const user = await userModel.findByIdAndUpdate(req.user.id, {
        userProfile: newProfile._id
    })
    return res.status(200).json({
        status: "success",
        data: {
            newProfile,
        },
    });
});



exports.updateMe = catchAsync(async (req, res, next) => {
    req.body.image = undefined
    const doc = await userProfileModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // console.log(doc.userProfile);
    return res.status(200).json({
        status: "success",
        data: {
            doc,
        },
    });
});

exports.uploadUserImage = imageMulter.single("image");

exports.resizeUserImage = catchAsync(async (req, res, next) => {
    if (!req.body.image) return next();
    let buffer = Buffer.from(req.body.image, 'base64');
    buffer = await sharp(buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toBuffer()
    req.body.image = buffer
    // .toFile(`public/images/users/${req.file.fileName}`);
    next();
});

exports.addFollowers = catchAsync(async (req, res, next) => {
    // Add follower to the user's followers array
    const user1 = await userModel.findByIdAndUpdate(req.user.id).populate("userProfile")

    // Add the user to the follower's following array
    const user2 = await userModel.findByIdAndUpdate(req.body.followerId).populate("userProfile")
    if (!user1 || !user2 || !user1.userProfile || !user2.userProfile)
        return next(new AppError("Document not found matching this id!", 404));
    user1.userProfile.following.push(req.body.followerId);
    user2.userProfile.followers.push(req.user.id);

    await user1.userProfile.save();
    await user2.userProfile.save();
    return res.status(200).json(new Response("success", user1));

})
exports.deleteFollowers = catchAsync(async (req, res, next) => {
    // Add follower to the user's followers array
    const user1 = await userModel.findByIdAndUpdate(req.user.id, { $pull: { following: req.body.followerId } }, { new: true });

    // Add the user to the follower's following array
    const user2 = await userModel.findByIdAndUpdate(req.body.followerId, { $pull: { followers: req.user.id } }, { new: true });
    if (!user1 || !user2)
        return next(new AppError("Document not found matching this id!", 404));


    return res.status(200).json(new Response("success", user1));

})
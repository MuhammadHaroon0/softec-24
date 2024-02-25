const sharp = require("sharp");
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const userProfileModel = require("../models/userProfileModel");
const catchAsync = require("../utils/catchAsync");
const Response = require("../utils/serverResponse");

exports.getPosts = catchAsync(async (req, res, next) => {
    const user = await userModel.findById(req.user.id).populate("userProfile");

    // Get the IDs of the user's followers
    const followerIds = user.userProfile.following;

    // Find posts created by the user's followers
    const posts = await postModel.find({ userProfile: { $in: followerIds } });
    return res.status(200).json(new Response("success", posts));

});
exports.addPost = catchAsync(async (req, res, next) => {

    const newpost = await postModel.create(req.body);
    const user = await userModel.findById(req.user.id).populate("userProfile")
    user.userProfile.posts.push(newpost._id);
    await user.userProfile.save();
    // console.log(newSection._id);
    return res.status(200).json(new Response("success", newpost));
});

exports.deletePost = catchAsync(async (req, res, next) => {
    const post = await postModel.findById(req.params.id);
    if (!post) {
        return res.status(404).json({
            status: 'fail',
            message: 'Post not found'
        });
    }

    // Remove the post reference from the userProfile array in the associated UserProfile document
    await userProfileModel.updateOne(
        { _id: post.userProfile },
        { $pull: { posts: post._id } }
    );

    // Delete the post document
    if (post.image)
        cloudinary.uploader.destroy(post.image);
    await postModel.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        message: 'Post deleted successfully'
    });
});

exports.resizePostImage = catchAsync(async (req, res, next) => {
    if (!req.body.image) return next();
    let buffer = Buffer.from(req.body.image, 'base64'); //receiving a base64 image and converting it into buffer

    req.boy.image = await sharp(buffer)
        .resize(1200, 630)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toBuffer()
    // .toFile(`public/images/users/${req.file.fileName}`);
    next();
});
// exports.deletePostImage = catchAsync(async (req, res, next) => {
//     const result = await cloudinary.uploader.destroy(req.body.image);

//     next();
// });

const cloudinary = require('cloudinary').v2;
const userModel = require('../models/userModel');
const AppError = require('./AppError');
const catchAsync = require('./catchAsync');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


exports.uploadToCloudinary = catchAsync(async (req, res, next) => {
    if (!req.body.image) return next();
    const uploadResult = await new Promise((resolve) => {
        cloudinary.uploader.upload_stream((error, uploadResult) => {
            if (error) {
                return next(new AppError(500, "Internal server error"))
            }

            return resolve(uploadResult);
        }).end(req.body.image);
    });

    const user = await userModel.findById(req.user.id).populate("userProfile")
    // console.log(user);
    const url = user.userProfile.image
    const segments = url.split('/');
    const filenameWithExtension = segments[segments.length - 1];
    const filename = filenameWithExtension.split('.')[0]; // remove file extension
    if (url === 'https://res.cloudinary.com/djmlypicw/image/upload/v1708617027/eqrjkezhqdivzkesyy0s.jpg')
        return next()
    try {
        const result = await cloudinary.uploader.destroy(filename);
        user.userProfile.image = uploadResult.secure_url
        console.log(user);
        await user.userProfile.save()
        // console.log(result);
    } catch (error) {
        console.log(error);
        return next(new AppError(500, "Internal server error"))
    }

    next()
});


exports.postUploadToCloudinary = catchAsync(async (req, res, next) => {
    if (!req.body.image) return next();
    const uploadResult = await new Promise((resolve) => {
        cloudinary.uploader.upload_stream((error, uploadResult) => {
            if (error) {
                return next(new AppError(500, "Internal server error"))
            }

            return resolve(uploadResult);
        }).end(req.body.image);
    });


    try {
        req.body.image = uploadResult.secure_url
        // console.log(result);
    } catch (error) {
        console.log(error);
        return next(new AppError(500, "Internal server error"))
    }

    next()
});


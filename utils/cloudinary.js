const cloudinary = require('cloudinary').v2;
const AppError = require('./AppError');
const catchAsync = require('./catchAsync');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


exports.uploadToCloudinary = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    const uploadResult = await new Promise((resolve) => {
        cloudinary.uploader.upload_stream((error, uploadResult) => {
            if (error)
                return next(new AppError(500, "Internal server error"))
            return resolve(uploadResult);
        }).end(req.file.buffer);
    });
    const url = req.user.image
    const segments = url.split('/');
    const filenameWithExtension = segments[segments.length - 1];
    const filename = filenameWithExtension.split('.')[0]; // remove file extension
    if (req.user.image === 'https://res.cloudinary.com/djmlypicw/image/upload/v1708617027/wasxjb0nsscsgjrd59c4.jpg')
        return next()
    try {
        const result = await cloudinary.uploader.destroy(filename);
        req.file.fileName = uploadResult.secure_url
        // console.log(result);
    } catch (error) {
        console.log(error);
        return next(new AppError(500, "Internal server error"))
    }

    next()
});


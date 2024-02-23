const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const userModel = require("../models/userModel");
const Response = require("../utils/serverResponse");

const projectModel = require("../models/projectModel");
exports.createProject = catchAsync(async (req, res, next) => {

    const project = await projectModel.create(req.body);
    const user = await userModel.findByIdAndUpdate(req.user,
        {
            $push: {
                projects: project._id
            },
        },
        {
            new: true,
        })
    return res.status(201).json(new Response("success", project));
});

exports.addCollaborator = catchAsync(async (req, res, next) => {
    if (!req.body.collaboratorId || !req.body.projectId) {
        return next(new AppError("Enter correct information!", 400));
    }
    const found = await projectModel.findByIdAndUpdate(
        req.body.projectId,
        {
            $push: {
                collaborators: req.body.collaboratorId
            },
        },
        {
            new: true,
        }
    );

    if (!found) {  //course Not found  
        return next(new AppError("Document not found matching this id!", 404));
    }
    return res.status(200).json(new Response("success", found));
});

exports.deleteCollaborator = catchAsync(async (req, res, next) => {
    if (!req.body.collaboratorId || !req.body.projectId) {
        return next(new AppError("Enter correct information!", 400));
    }
    const found = await projectModel.findByIdAndUpdate(
        req.body.projectId,
        {
            $pull: {
                collaborators: req.body.collaboratorId
            },
        },
        {
            new: true,
        }
    );

    if (!found) {
        return next(new AppError("Document not found matching this id!", 404));
    }
    return res.status(200).json(new Response("success", found));
});

exports.deleteProject = catchAsync(async (req, res, next) => {

    const projectId = req.params.id;
    const found = await projectModel.findById(projectId);
    if (!found) {
        return next(new AppError("Document not found matching this id!", 404));
    }

    for (const versionId of found.versions) {
        await versionModel.findByIdAndDelete(versionId);
    }
    await projectModel.findByIdAndDelete(projectId);
    await userModel.findByIdAndUpdate(req.user.id, { $pull: { projects: projectId } });

    return res.status(204).json(new Response("success", found));
});
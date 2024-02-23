const express = require("express");
const router = express.Router();
const {
    updateOne,
    getOne,
    getAll,
} = require("../controllers/handlerFactory");

const projectModel = require("../models/projectModel");
const { addCollaborator, createProject, deleteProject, deleteCollaborator } = require("../controllers/projectController");
const { protect } = require("../controllers/authController");
router.route("/").post(protect, createProject)
    .get(getAll(projectModel))

router.route("/addCollaborator").patch(protect, addCollaborator)
router.route("/deleteCollaborator").patch(protect, deleteCollaborator)
router.route("/:id")
    .get(getOne(projectModel, "createdBy"))
    .delete(protect, deleteProject)
    .patch(updateOne(projectModel))


module.exports = router;

const Message = require("../models/messageModel");
const Users = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllMessagesOfSingleUser = catchAsync(async (req, res, next) => {
    const doc = await Message.find({ $or: [{ sender: req.params.senderId }, { receiver: req.params.senderId }] });
    if (!doc) {
        return res.status(200).json({
            status: 'success',
            totalResults: 0,
        })
    }
    return res.status(200).json({
        status: 'success',
        totalResults: doc.length,
        data: {
            doc
        }
    })
})


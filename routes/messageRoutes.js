const express = require('express')
const router = express.Router()
const { getAll } = require('../controllers/handlerFactory');
const { protect } = require('../controllers/authController');
const messageModel = require('../models/messageModel');
const { getAllMessagesOfSingleUser } = require('./../controllers/messageController');
router.use(protect)
router.route('/').get(getAll(messageModel));
router.route('/:senderId').get(getAllMessagesOfSingleUser)

module.exports = router
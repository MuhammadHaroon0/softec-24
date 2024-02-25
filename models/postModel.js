const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userProfiles',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('Post', postSchema);


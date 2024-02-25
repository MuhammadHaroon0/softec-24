const mongoose = require('mongoose');

const dietSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    currentDate: {
        type: Date,
        default: Date.now()
    }
});



module.exports = mongoose.model('Diet', dietSchema);
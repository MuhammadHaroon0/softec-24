const mongoose = require('mongoose');
const AppError = require('../utils/AppError');

const eventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    timeSlots: {
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true,
        },
    },
    date: {
        type: Date,
        required: [true, "event date is required"]
    }
});

eventSchema.pre('save', function (next) {
    // Access the current event being saved using `this`
    const event = this;

    // Access the start time and end time fields of the event
    const startTime = event.timeSlots.startTime + ":00";
    const endTime = event.timeSlots.endTime + ":00";

    // Convert start and end time strings to Date objects for comparison

    console.log(startTime, "\n");

    // Compare start and end times
    if (new Date('1/1/1999 ' + startTime) >= new Date('1/1/1999 ' + endTime)) {
        return next(new AppError('End time must be after start time', 401));
    }

    // If the comparison passes, continue with the save operation
    next();
});
module.exports = mongoose.model('event', eventSchema);


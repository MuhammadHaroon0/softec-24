const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    duration: {
        type: Number,
        required: true // Duration of the workout in minutes
    },
    activity: {
        type: String,
        required: true // Type of activity (e.g., running, weightlifting, yoga)
    },
    intensity: {
        type: String,
        enum: ['Low', 'Moderate', 'High'],
        default: 'Moderate' // Intensity level of the workout
    },
});


module.exports = mongoose.model('workout', workoutSchema);
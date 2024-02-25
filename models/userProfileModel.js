const mongoose = require("mongoose");
var validator = require("validator");

const userprofileSchema = new mongoose.Schema({
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: [true, "Gender is required"]
    },
    DOB: {
        type: Date,
        required: [true, "DOB is required"]
    },
    height: {
        type: Number,
        required: [true, "Height is required"]
    },
    weight: {
        type: Number,
        required: [true, "Weight is required"]
    },
    bio: {
        type: String,
    },
    timeSlots: [{
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return value > this.parent().startTime; // Ensure endTime is greater than startTime
                },
                message: props => `End time must be greater than start time`
            }
        },
    }],
    certifications: [String],
    goals: {
        type: String,
        enum: ["Weight Gain", "Weight Loss", "Body Building", "Athletic Training", "Learn the basics", "Gain more flexibility"],
    },
    activityLevel: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/djmlypicw/image/upload/v1708617027/eqrjkezhqdivzkesyy0s.jpg",
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    diet:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "diet",
        }],
    workout:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "workout",
        }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
    }]

},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    });
//To provide efficient searching of mongodb
// userprofileSchema.index({ SOMETHING : 1, SOMETHING: -1 }); //1 for ascending -1 for descending

//Document middlewares,can work before or after save or create
// Pre Save Hook
// userprofileSchema.pre('save',function(next){
//     //query middleware
//     next()
// })

// userprofileSchema.pre(/^find/,function(next){
//     //query middleware
//     next()
// })

//Post Save Hook
//The save hook doenst works for findAndUpdate and insertMany etc
// userprofileSchema.post('save', function (doc, next) {
//   next();
// });

//? Aggeregation Middleware, works before or after aggregation function
// userprofileSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: {  } });
//   next();
// });

// userprofileSchema.methods.FUNCTIONNAME=function()
// {
//     //member functions
// }

//usually for child-parent referencing
// userprofileSchema.virtual('',{
//
// })

module.exports = mongoose.model("userprofile", userprofileSchema);

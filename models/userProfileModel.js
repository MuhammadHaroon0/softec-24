const mongoose = require("mongoose");
var validator = require("validator");


const enthusiastSchema = new mongoose.Schema({
    height: {
        type: String,
        required: [true, "Height is required"]
    },
    weight: {
        type: Number,
        required: [true, "Contact is required"]
    },
    bio: {
        type: String,
    },

    timeSlots: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "timeslot",
    },
    certifications: {
        type: [String]
    },
    goals: {
        type: String,
        enum: ["Weight Gain", "Weight Loss", "Body Building", "Athletic Training",
            "Learn the basics", "Gain more flexibility"],
    },
    activityLevel: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advance"],
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/djmlypicw/image/upload/v1708617027/wasxjb0nsscsgjrd59c4.jpg",
    },
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })

//To provide efficient searching of mongodb
// enthusiastSchema.index({ SOMETHING : 1, SOMETHING: -1 }); //1 for ascending -1 for descending

//Document middlewares,can work before or after save or create
// Pre Save Hook
// enthusiastSchema.pre('save',function(next){
//     //query middleware
//     next()
// })

// enthusiastSchema.pre(/^find/,function(next){
//     //query middleware
//     next()
// })

//Post Save Hook
//The save hook doenst works for findAndUpdate and insertMany etc
// enthusiastSchema.post('save', function (doc, next) {
//   next();
// });

//? Aggeregation Middleware, works before or after aggregation function
// enthusiastSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: {  } });
//   next();
// });

// enthusiastSchema.methods.FUNCTIONNAME=function()
// {
//     //member functions
// }

//usually for child-parent referencing
// enthusiastSchema.virtual('',{
//
// })

module.exports = mongoose.model("enthusiast", enthusiastSchema);

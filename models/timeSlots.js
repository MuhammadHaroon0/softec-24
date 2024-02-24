const mongoose = require("mongoose");
var validator = require("validator");


const timeSlotsSchema = new mongoose.Schema({
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.startTime; // Ensure endTime is greater than startTime
            },
            message: props => `End time must be greater than start time`
        }
    },
})
//To provide efficient searching of mongodb
// timeSlotsSchema.index({ SOMETHING : 1, SOMETHING: -1 }); //1 for ascending -1 for descending

//Document middlewares,can work before or after save or create
// Pre Save Hook
// timeSlotsSchema.pre('save',function(next){
//     //query middleware
//     next()
// })

// timeSlotsSchema.pre(/^find/,function(next){
//     //query middleware
//     next()
// })

//Post Save Hook
//The save hook doenst works for findAndUpdate and insertMany etc
// timeSlotsSchema.post('save', function (doc, next) {
//   next();
// });

//? Aggeregation Middleware, works before or after aggregation function
// timeSlotsSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: {  } });
//   next();
// });

// timeSlotsSchema.methods.FUNCTIONNAME=function()
// {
//     //member functions
// }

//usually for child-parent referencing
// timeSlotsSchema.virtual('',{
//
// })

module.exports = mongoose.model('timeslot', timeSlotSchema);

const mongoose = require("mongoose");
var validator = require("validator");


const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minLength: 4,
        maxLength: 30,
    },
    description: {
        type: String,
        required: [true, "name is required"],
        minLength: 4,
        maxLength: 30,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    versions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "versions"
    }],
    currentVersion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "versions",
        default: null
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })

//To provide efficient searching of mongodb
// projectSchema.index({ SOMETHING : 1, SOMETHING: -1 }); //1 for ascending -1 for descending

//Document middlewares,can work before or after save or create
// Pre Save Hook
// projectSchema.pre('save',function(next){
//     //query middleware
//     next()
// })

// projectSchema.pre(/^find/,function(next){
//     //query middleware
//     next()
// })

//Post Save Hook
//The save hook doenst works for findAndUpdate and insertMany etc
// projectSchema.post('save', function (doc, next) {
//   next();
// });

//? Aggeregation Middleware, works before or after aggregation function
// projectSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: {  } });
//   next();
// });

// projectSchema.methods.FUNCTIONNAME=function()
// {
//     //member functions
// }

//usually for child-parent referencing
// projectSchema.virtual('',{
//
// })

module.exports = mongoose.model("project", projectSchema);

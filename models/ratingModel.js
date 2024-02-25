const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, "rating is required"],
  },
  review: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  givenTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

//To provide efficient searching of mongodb
// userSchema.index({ SOMETHING : 1, SOMETHING: -1 }); //1 for ascending -1 for descending

//Document middlewares,can work before or after save or create
// Pre Save Hook
// userSchema.pre('save',function(next){
//     //query middleware
//     next()
// })

// userSchema.pre(/^find/,function(next){
//     //query middleware
//     next()
// })

//Post Save Hook
//The save hook doenst works for findAndUpdate and insertMany etc
// tourSchema.post('save', function (doc, next) {
//   next();
// });

//? Aggeregation Middleware, works before or after aggregation function
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: {  } });
//   next();
// });
ratingSchema.statics.getAvgRating = async function (userId) {
  const stats = await this.aggregate([
    {
      $match: { givenTo: userId },
    },
    {
      $group: {
        _id: "$givenTo",
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  await courseModel.findByIdAndUpdate(userId, {
    avgRating: stats[0].avgRating,
  });
};
ratingSchema.post("save", function () {
  this.constructor.getAvgRating(this.givenTo); //updating avg rating soon after creating the document in course model
});
// userSchema.methods.FUNCTIONNAME=function()
// {
//     //member functions
// }

exports.ratingModel = mongoose.model("Rating", ratingSchema);

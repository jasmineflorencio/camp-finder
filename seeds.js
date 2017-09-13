var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");

var data = [
  {
    name: "Sunset Rise",
    image: "https://farm3.staticflickr.com/2919/14554501150_8538af1b56.jpg",
    description: "Lovely place to watch the sunset rise."
  },
  {
    name: "Soaring Cliff",
    image: "https://farm9.staticflickr.com/8022/7529209752_1d3c46d09f.jpg",
    description: "Please do not fall off."
  },
  {
    name: "Shady Canyon",
    image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
    description: "Escape from the sun's harsh rays at Shady Canyon."
  }
];

function seedDB(){
  Campground.remove({}, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log("removed campgrounds!");
    }
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if (err) {
          console.log(err);
        } else {
          console.log("campground added!");
          Comment.create({
            text: "What a darling campsite for my very first camping trip.",
            author: "Marla Dask"
          }, function(err, comment){
            if (err) {
              console.log(err);
            } else {
              campground.comments.push(comment);
              campground.save();
              console.log("new comment!");
            }
          });
        }
      });
    });
  });
};

module.exports = seedDB;

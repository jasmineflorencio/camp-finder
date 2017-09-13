var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// var campgrounds = [
//   {name: "Salmon Creek", image: "https://source.unsplash.com/5Rhl-kSRydQ"},
//   {name: "Granite Hill", image: "https://source.unsplash.com/nYiCGILaoVI"},
//   {name: "Eagle's Perch", image: "https://source.unsplash.com/K9olx8OF36A"},
//   {name: "Windy River", image: "https://source.unsplash.com/qelGaL2OLyE"},
//   {name: "Watery Heights", image: "https://source.unsplash.com/FHjmmLeEipo"},
//   {name: "Soaring Cliff", image: "https://source.unsplash.com/sK1hW5knKkw"}
// ]
app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, camps){
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: camps});
    }
  });
});

app.post("/campgrounds", function(req, res){
  var campName = req.body.name,
      campImage = req.body.image,
      campDesc = req.body.description,
      newCamp = {name: campName, image: campImage, description: campDesc};
  Campground.create(newCamp, function(err, camp){
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function(req, res){
  res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, idCamp){
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: idCamp});
    }
  });
});

app.get("/campgrounds/:id/comments/new", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

app.post("/campgrounds/:id/comments", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

app.listen(3000, function(){
  console.log("Here we go!")
});

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Salmon Creek",
//     image: "https://source.unsplash.com/5Rhl-kSRydQ",
//     description: "Nice little salmony creek."
//   }, function (err, camp) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("new camp!");
//       console.log(camp);
//     }
// });

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
      res.render("index", {campgrounds: camps});
    }
  });
});

app.post("/campgrounds", function(req, res){
  var campName = req.body.name;
  var campImage = req.body.image;
  var campDesc = req.body.description;
  var newCamp = {name: campName, image: campImage, description: campDesc}
  Campground.create(newCamp, function(err, camp){
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function(req, res){
  res.render("new");
});

app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id, function(err, idCamp){
    if (err) {
      console.log(err);
    } else {
      res.render("show", {campground: idCamp});
    }
  });
});

app.listen(3000, function(){
  console.log("Here we go!")
});

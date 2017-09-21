var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground");

router.get("/", function(req, res){
  req.user
  Campground.find({}, function(err, camps){
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: camps});
    }
  });
});

router.post("/", function(req, res){
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

router.get("/new", function(req, res){
  res.render("campgrounds/new");
});

router.get("/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, idCamp){
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: idCamp});
    }
  });
});

module.exports = router;

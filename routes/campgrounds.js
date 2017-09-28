var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground");

// index
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

// create
router.post("/", isLoggedIn, function(req, res){
  var campName = req.body.name,
      campImage = req.body.image,
      campDesc = req.body.description,
      campAuthor = {
        id: req.user._id,
        username: req.user.username
      },
      newCamp = {
        name: campName,
        image: campImage,
        description: campDesc,
        author: campAuthor};
  Campground.create(newCamp, function(err, camp){
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// new
router.get("/new", isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

// show
router.get("/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, idCamp){
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: idCamp});
    }
  });
});

// edit
router.get("/:id/edit", checkCampOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCamp){
    res.render("campgrounds/edit", {campground: foundCamp});
  });
});

// update
router.put("/:id", checkCampOwnership, function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updateCamp){
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// destroy
router.delete("/:id", checkCampOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// middleware
function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

function checkCampOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCamp){
      if (err) {
        res.redirect("back");
      } else {
        if (foundCamp.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

module.exports = router;

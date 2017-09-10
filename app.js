var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
  {name: "Salmon Creek", image: "https://source.unsplash.com/5Rhl-kSRydQ"},
  {name: "Granite Hill", image: "https://source.unsplash.com/nYiCGILaoVI"},
  {name: "Eagle's Perch", image: "https://source.unsplash.com/K9olx8OF36A"},
  {name: "Windy River", image: "https://source.unsplash.com/qelGaL2OLyE"},
  {name: "Watery Heights", image: "https://source.unsplash.com/FHjmmLeEipo"},
  {name: "Soaring Cliff", image: "https://source.unsplash.com/sK1hW5knKkw"}
]

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
  var campName = req.body.name;
  var campImage = req.body.image;
  var newCamp = {name: campName, image: campImage}
  campgrounds.push(newCamp);
  res.redirect("/campgrounds")
});

app.get("/campgrounds/new", function(req, res){
  res.render("new");
});


app.listen(3000, function(){
  console.log("Here we go!")
});

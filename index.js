const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Campground = require('./models/campgrounds')
const seedDB = require('./seeds')

seedDB()

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

// Rouuutes

app.get("/", function(req, res) {
    res.render("landingpage")
})

app.get("/campgrounds",function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if(err) {
            console.log(err)
        } else {
            res.render("campgrounds", {campgrounds: campgrounds})
        }
    })
})

app.post("/campgrounds", function(req, res) {
    let title = req.body.title
    let imgURL = req.body.imgURL
    let disc = req.body.disc
    let newCampground = {title: title, imgURL: imgURL, disc: disc}

    Campground.create(newCampground, function(err) {
        if(err) {
            console,log(err)
        } else {
            res.redirect("campgrounds")
        }
    })
})

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})

//show route
app.get("/campgrounds/:id", function(req, res) {
    // Campground.findById(req.params.id, function(err, campground) {
    //     if(err) {
    //         console.log(err)
    //     } else {
    //         res.render("show", {campground: campground})
    //     }
    // })
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground) {
        if(err) {
            console.log(err)
        } else {
            res.render("show", {campground: campground})
        }
    })

})

app.listen(3000, function() {
    console.log("Server Live")
})
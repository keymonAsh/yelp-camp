const express = require('express')
const router = express.Router()
const Campground = require('../models/campgrounds')

router.get("/",function(req, res) {
    // console.log(req.user)
    Campground.find({}, function(err, campgrounds) {
        if(err) {
            console.log(err)
        } else {
            res.render("campgrounds/campgrounds", {campgrounds: campgrounds, currUser: req.user})
        }
    })
})

router.post("/", function(req, res) {
    let title = req.body.title
    let imgURL = req.body.imgURL
    let disc = req.body.disc
    let newCampground = {title: title, imgURL: imgURL, disc: disc}

    Campground.create(newCampground, function(err) {
        if(err) {
            console,log(err)
        } else {
            res.redirect("campgrounds/campgrounds")
        }
    })
})

router.get("/new", function(req, res) {
    res.render("campgrounds/new");
})

//show route
router.get("/:id", function(req, res) {
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
            res.render("campgrounds/show", {campground: campground})
        }
    })

})

module.exports = router
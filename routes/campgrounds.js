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

router.post("/", isLoggedIn, function(req, res) {
    let title = req.body.title
    let imgURL = req.body.imgURL
    let disc = req.body.disc
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCampground = {title: title, imgURL: imgURL, disc: disc, author: author}

    Campground.create(newCampground, function(err) {
        if(err) {
            console,log(err)
        } else {
            res.redirect("/campgrounds")
        }
    })
})

router.get("/new", isLoggedIn, function(req, res) {
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

router.get("/:id/edit" , campgroundUserCheck, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err)
        } else {
            if(campground.author.id.equals(req.user._id)) {
                res.render("campgrounds/edit", {campground: campground})
            } else {
                res.send("YOU DONT HAVE PERMISSION")
            }
        }
    })
})

router.put("/:id", function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground) {
        if(err) {
            console.log(err)
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})


router.delete("/:id", campgroundUserCheck, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err)
        } else {
            res.redirect("/campgrounds")
        }
    })
})

// MIDDLEWARE
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

function campgroundUserCheck(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, campground) {
            if(err) {
                console.log(err)
            } else {
                if(campground.author.id.equals(req.user._id)) {
                    next()
                } else {
                    res.send("YOU DONT HAVE PERMISSION")
                }
            }
        })
    } else {
        res.redirect("back")
    }
}

module.exports = router
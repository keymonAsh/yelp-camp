const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Campground = require('./models/campgrounds')
const Comment = require('./models/comments')
const User = require('./models/user')
const seedDB = require('./seeds')

const passport = require('passport')
const localStrategy = require('passport-local')

seedDB()

// passport Congig

app.use(require('express-session')({
    secret: "sfgkjbfgiklhwlfikgjr",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

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
            res.render("campgrounds/campgrounds", {campgrounds: campgrounds})
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
            res.redirect("campgrounds/campgrounds")
        }
    })
})

app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
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
            res.render("campgrounds/show", {campground: campground})
        }
    })

})

// COMMENTS routeee

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err) 
        } else {
            res.render("comments/new", {campground: campground})
        }
    })

})

// displaying new comments in show 
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err)
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err)
                } else {
                    campground.comments.push(comment)
                    campground.save()
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    })
})

// AUTH Routes


// register
app.get("/register", function(req, res) {
    res.render("register")
})

app.post("/register", function(req, res) {
    const newUser =  new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err)
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/campgrounds")
            })
        }
    })
})

// log in

app.get("/login", function(req, res) {
    res.render("login")
})

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), 
    function(req, res) {
        
})

// logout route

app.get("/logout", function(req, res) {
    req.logout()
    res.redirect("/campgrounds")
})

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

app.listen(3000, function() {
    console.log("Server Live")
})
const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')



router.get("/", function(req, res) {
    res.render("landingpage")
})


// register
router.get("/register", function(req, res) {
    res.render("register")
})

router.post("/register", function(req, res) {
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
router.get("/login", function(req, res) {
    res.render("login")
})

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), 
    function(req, res) {
        
})

// logout route
router.get("/logout", function(req, res) {
    req.logout()
    res.redirect("/campgrounds")
})

module.exports = router

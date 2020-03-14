const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Campground = require('./models/campgrounds')
const Comment = require('./models/comments')
const User = require('./models/user')
const seedDB = require('./seeds')

const passport = require('passport')
const localStrategy = require('passport-local')

const campgroundsRoutes = require('./routes/campgrounds')
const commentsRoutes = require('./routes/comments')
const indexRoutes = require('./routes/index')

// seedDB()

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

app.use(function(req, res, next) {
    res.locals.currUser = req.user
    next()
})

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(methodOverride("_method"))


app.use(indexRoutes)
app.use("/campgrounds/:id/comments", commentsRoutes)
app.use("/campgrounds", campgroundsRoutes)


app.listen(3000, function() {
    console.log("Server Live")
})
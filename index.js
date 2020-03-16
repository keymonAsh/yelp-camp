const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const User = require('./models/user')

const passport = require('passport')
const localStrategy = require('passport-local')

const campgroundsRoutes = require('./routes/campgrounds')
const commentsRoutes = require('./routes/comments')
const indexRoutes = require('./routes/index')

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

mongoose.connect("mongodb+srv://aswin_1234:aswin_1234@cluster0-sy0vr.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(methodOverride("_method"))


app.use(indexRoutes)
app.use("/campgrounds/:id/comments", commentsRoutes)
app.use("/campgrounds", campgroundsRoutes)


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server Live")
})
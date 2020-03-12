const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

// var campgrounds = [
//     {title: "Tile 1", img: "https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"},
//     {title: "Tile 2", img: "https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"},
//     {title: "Tile 3", img: "https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"}
// ]

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

// Schema

const campgroundSchema = new mongoose.Schema({
    title: String,
    imgURL: String,
    disc: String
})

const Campground = mongoose.model("Campground", campgroundSchema)

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
    let newCampground = {title: title, imgURL: imgURL}

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

app.get("/campgrounds/:id", function(req, res) {
    
})

app.listen(3000, function() {
    console.log("Server Live")
})
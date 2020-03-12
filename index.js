const express = require('express')
const app = express();
const bodyParser = require('body-parser')

var campgrounds = [
    {title: "Tile 1", img: "https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"},
    {title: "Tile 2", img: "https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"},
    {title: "Tile 3", img: "https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"}
]

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

app.get("/", function(req, res) {
    res.render("landingpage")
})

app.get("/campgrounds",function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds})
})

app.post("/campgrounds", function(req, res) {
    let title = req.body.title
    let image = req.body.image

    campgrounds.push({title: title, img: image})

    res.redirect("/campgrounds")
})

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})

app.listen(3000, function() {
    console.log("Server Live")
})
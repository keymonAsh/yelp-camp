const express = require('express')
const app = express();

const campgrounds = [
    {title: "Tile 1", img: ""},
    {title: "Tile 2", img: ""},
    {title: "Tile 3", img: ""}
]

app.set("view engine", "ejs")

app.get("/", function(req, res) {
    res.render("landingpage")
})

app.get("/campgrounds",function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds})
})

app.listen(3000, function() {
    console.log("Server Live")
})
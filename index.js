const express = require('express')
const app = express();

app.get("/", function(req, res) {
    res.send("Yelp Camp")
})

app.listen(3000, function() {
    console.log("Server Live")
})
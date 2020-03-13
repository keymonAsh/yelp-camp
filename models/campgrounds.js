const mongoose = require('mongoose')

const campgroundSchema = new mongoose.Schema({
    title: String,
    imgURL: String,
    disc: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

const Campground = mongoose.model("Campground", campgroundSchema)

module.exports = Campground
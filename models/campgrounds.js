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
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})

const Campground = mongoose.model("Campground", campgroundSchema)

module.exports = Campground
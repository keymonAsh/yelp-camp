const mongoose = require('mongoose')
const Campground = require('./models/campgrounds')
const Comment = require('./models/comments')

const data = [
    {title: "moutain range", imgURL: "https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg", disc: "High AF"},
    {title: "desert fun", imgURL: "https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg", disc: "Dry AF"},
    {title: "Ocearic OLEE", imgURL: "https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg", disc: "WET AP"},
]


function seedDb() {
    //Remove
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err)
        }
        console.log("Campgrounds Removed")
    })

    //add Campgrounds
    data.forEach(function(campground) {
        Campground.create(campground, function(err, campground) {
            if(err) {
                console.log(err)
            } else {
                console.log("Added a Campground")
                // create  comments
                Comment.create({
                    author: "Homer",
                    text: "Such a nice place"
                }, function(err, comment) {
                    if(err) {
                        console.log(err)
                    } else {
                        campground.comments.push(comment)
                        campground.save()
                    }

                })
            }
        })
    })
}

module.exports = seedDb
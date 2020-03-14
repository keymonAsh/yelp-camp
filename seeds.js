const mongoose = require('mongoose')
const Campground = require('./models/campgrounds')
const Comment = require('./models/comments')

const data = [
    {title: "moutain range", imgURL: "https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg", disc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, atque perferendis. Suscipit quas fugiat ipsum odit itaque, iusto quaerat incidunt. Consectetur modi rerum commodi, voluptate quibusdam quae a eos suscipit."},
    {title: "desert fun", imgURL: "https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg", disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem minus, mollitia temporibus vero ipsam reiciendis placeat dolore nesciunt obcaecati! Natus dolorem eius necessitatibus voluptatum sapiente officiis labore libero perspiciatis qui?"},
    {title: "Ocearic OLEE", imgURL: "https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg", disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis libero ipsum rem cum nam, asperiores debitis ex beatae possimus, iure ratione odit in dolorem numquam nesciunt voluptate, animi iste enim."},
]


function seedDb() {
    //Remove
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err)
        }
        console.log("Campgrounds Removed")
    })

    Comment.remove({}, function(err) {
        if(err) {
            console.log(err)
        }
        console.log("Comments Removed")
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

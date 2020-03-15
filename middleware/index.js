const middleware = {}
const Campground = require("../models/campgrounds")
const Comment = require("../models/comments")

middleware.campgroundUserCheck = function (req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, campground) {
            if(err) {
                console.log(err)
            } else {
                if(campground.author.id.equals(req.user._id)) {
                    next()
                } else {
                    res.send("YOU DONT HAVE PERMISSION")
                }
            }
        })
    } else {
        res.redirect("back")
    }
}

middleware.commentUserCheck = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if(err) {
                console.log(err)
            } else {
                if(comment.author.id.equals(req.user._id)) {
                    next()
                } else {
                    res.redirect("back")
                }
            }
        })
    } else {
        res.redirect("back")
    }
}

middleware.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

module.exports = middleware

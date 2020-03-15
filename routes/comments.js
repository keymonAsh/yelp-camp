const express = require('express')
const router = express.Router({mergeParams: true})
const Campground = require('../models/campgrounds')
const Comment = require('../models/comments')


router.get("/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err) 
        } else {
            res.render("comments/new", {campground: campground})
        }
    })

})


router.post("/", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err)
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err)
                } else {
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    comment.save()
                    campground.comments.push(comment)
                    campground.save()
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    })
})

router.get("/:comment_id/edit", commentUserCheck, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
        if(err) {
            res.redirect("back")
        } else {
            res.render("comments/edit", {comment: comment, campground_id: req.params.id})
            console.log(comment._id)
        }
    })
})

router.put("/:comment_id", commentUserCheck, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment) {
        if(err) {
            console.log(err)
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

router.delete("/:comment_id", commentUserCheck, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            console.log(err)
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

// MIDDLEWAre

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}



function commentUserCheck(req, res, next) {
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

module.exports = router
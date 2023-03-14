const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = (req,res)=>{

    // finding the post first in case the user have changed the value of post at the frontend
    Post.findById(req.body.post)
    .then((post)=>{
        // if post found then create the comment 
        if(post){
            // creating the comment
            Comment.create({
                content: req.body.comment,
                user: req.user._id,
                post: req.body.post
            })
            .then((comment)=>{
                // after creating  the comment pushing that commebt into the post's comments field
                post.comments.push(comment);
                // after updating something is db documennt we have to call save 
                post.save();
            })
            .catch((err)=>{
                console.error("Error in creating comment",err);
            })
        }
    })
    .catch((err)=>{
        console.log("error In finding the post",err);
    })
    .finally(()=>{
        res.redirect('/');
    })

    

}

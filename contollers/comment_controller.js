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

module.exports.destroy = function(req,res){

    // finding id the comment exist which we want to delete
    Comment.findById(req.params.id)
    .then((comment)=>{

        // checking if the comment belongs to the same use who is deleting it 
        if(req.user.id == comment.user){

            // updating the comments array of the corresponding post
            Post.updateOne({
                _id: comment.post, // finding the post on which the comment is done
                $pull: {
                    comments: comment._id // pulling out the comment id of the comment from the comments array
                } 
            });

            // deleting the comment
            comment.deleteOne();
        }
    })
    .catch((err)=>{
        console.error("error in finding the comment",err);
    })
    .finally(()=>{
        res.redirect('back');
    })
}
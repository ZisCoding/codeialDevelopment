const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = async (req,res)=>{

    try{
        // finding the post first in case the user have changed the value of post at the frontend
        let post = await Post.findById(req.body.post)

        // if post found then create the comment 
        if(post){
            // creating the comment
            let comment = await Comment.create({
                content: req.body.comment,
                user: req.user._id,
                post: req.body.post
            })

            // after creating  the comment pushing that commebt into the post's comments field
            post.comments.push(comment);
            // after updating something is db documennt we have to call save 
            post.save();
            res.redirect('/');
        }else{
            res.redirect('/');
        }
    }catch(err){
        console.log("Error",err);
        return;
    }

    
}

module.exports.destroy = async function(req,res){

    try{
         // finding id the comment exist which we want to delete
        let comment = await Comment.findById(req.params.id)
    
        // checking if the comment belongs to the same use who is deleting it 
        if(req.user.id == comment.user){

            // updating the comments array of the corresponding post
            await Post.updateOne({
                _id: comment.post, // finding the post on which the comment is done
                $pull: {
                    comments: comment._id // pulling out the comment id of the comment from the comments array
                } 
            });

            // deleting the comment
            comment.deleteOne();
            res.redirect('back');
        }else{
            res.redirect('back');
        }
    }catch(err){
        console.log("Error",err);
        return ;
    }
   
}
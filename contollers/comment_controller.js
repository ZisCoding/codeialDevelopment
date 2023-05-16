const Post = require('../models/post');
const Comment = require('../models/comment');
const commentsMailer = require('../mailer/comment_mailer');


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
            
            //populating the commebt to get user name
            let populatedComment = await comment.populate('user')
            
            commentsMailer.newComment(populatedComment);

            // checking if the request is a xhr request
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment,
                        user_name: populatedComment.user.name
                    },
                    message: 'comment created successfully',
                    flash: {
                        success: "Comment created successfully"
                    }
                })
                
            }else{
                req.flash('success','Comment created successfully'); // setting flash message
                res.redirect('/');
            }

        }else{
            req.flash('success',"You aren't authorized to comment on this post");
            return res.redirect('/')
        }
    }catch(err){
        req.flash('error','Error in creating comment'); // setting flash message
        return res.redirect('/');
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
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        commentId: req.params.id
                    },
                    message: "Comment deleted succesfully",
                    flash: {
                        success: "Comment deleted successfully"
                    }
                })
            }else{
                req.flash('success','Comment deleted successfully'); // setting flash message
                res.redirect('back');
            }
        }else{
            req.flash('success',"You aren't authorized to delete this comment");
            res.redirect('back');
        }
    }catch(err){
        req.flash('error','Error in deleting comment'); // setting flash message
        res.redirect('back');
    }
   
}
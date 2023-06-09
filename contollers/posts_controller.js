const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.create = function (req,res){
    
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
    .then((post)=>{

        // populating post to get the user's name
        post.populate('user')
        .then((populatedPost)=>{
            return res.status(200).json({
                data:{
                    // sending the post without password
                    post: {
                        content: populatedPost.content,
                        username: populatedPost.user.name,
                        _id: populatedPost._id 
                    }, 
                },
                message : 'success',
                flash: {
                    success: "Post created successfully",
                }
            });
        })
        .catch((error)=>{
            console.log("error in populating post",error);
        });
    })
    .catch((err)=>{
        req.flash('error','Error in creating post'); // setting flash message
        return res.redirect('back');
    });

}

module.exports.destroy = async function(req, res){
   
    try{
        let post = await Post.findById(req.params.id)
   
        // cheking if the user deleting the post is autherised to delete it or not 
        if(post.user == req.user.id) // we choose user.id here instead of user._id because user.id gives a a string of the objectid because we have to compare it with a string
        {

            // this will delete the post from db
            post.deleteOne();

            // this will remove all the comment having post id of the deleted post
            await Comment.deleteMany({post : req.params.id})

            // cheking if the request is an xhr request and handling it according to that
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        postId:req.params.id 
                    },
                    message: 'Post deleted',
                    flash: {
                        success: 'Post deleted successfully'
                    }
                });
            }

            req.flash('success',"Post deleted successfully");
            res.redirect('back');
        }else{
            req.flash('success',"You aren't authorized to delete this post");
            return res.redirect('back')
        }
    }catch(err){
        req.flash("error","Error in deleting post");
        
        return res.redirect('back');
    }

}

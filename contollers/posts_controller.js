const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function (req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
    .then((post)=>{
        return res.redirect('back');
    })
    .catch((err)=>{
        console.error("error in creating post",err);
        return res.redirect('back');
    });

}

module.exports.destroy = function(req, res){
    Post.findById(req.params.id)
    .then((post)=>{

        // cheking if the user deleting the post is autherised to delete it or not 
        if(post.user == req.user.id) // we choose user.id here instead of user._id because user.id gives a a string of the objectid because we have to compare it with a string
        {

            // this will delete the post from db
            post.deleteOne();

            // this will remove all the comment having post id of the deleted post
            Comment.deleteMany({post : req.params.id})
            .catch((err)=>{
                console.error("wrror in deleting post",err);
            })
        }

    })
    .catch((err)=>{
        console.error("error in finding the post", err);
    })
    .finally(()=>{
        res.redirect('back');
    });
}

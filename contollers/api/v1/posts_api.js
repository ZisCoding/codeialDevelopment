const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async (req , res)=>{

    let posts = await Post.find({})
        .sort('-createdAt') // sorting in the recent post to late post order 
        .populate({
            path: 'user',
            select : 'name -_id'
        })
        .populate({
            path : 'comments',
            populate:{ // nesting the populate
                path: 'user',
                select: '-password'
            }
        });


    return res.status(200).json({
        message : "List of posts v1",
        posts: posts
    });
}

module.exports.delete = async (req,res)=>{
    try{
        let post = await Post.findById(req.params.id)
        
        if(post.user== req.user.id){
            // this will delete the post from db
            post.deleteOne();

            // this will remove all the comment having post id of the deleted post
            await Comment.deleteMany({post : req.params.id})

            res.status(200).json({
                message: "Post and associated comments are deleted succesfully"
            });
        }else{
            return res.status(401).json({
                message: "You cannot delete this post"
            });
        }

    }catch(err){
        res.status('500').json({
            message: "Error in deleting post"
        })
    }
}
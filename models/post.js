const mongoose = require('mongoose');

// creating schema for post
const postSchema = new mongoose.Schema({
    // this field is for storing the content of post
    content:{ 
        type: String,
        required: true
    },
    // this field will establish the realtion bw the post and the user who created it 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // storing the id's of all the comment which belongs to the post  here comments is an array containig an obj
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
    
},
{
    // timesstamps as usual will store the timeline of each post
    timestamps: true
})


const Post = mongoose.model('Post' , postSchema);

module.exports = Post;
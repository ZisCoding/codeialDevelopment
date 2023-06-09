const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    // the user to which this comment belong
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // the post to which this comment belong
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
},{
    timestamps: true
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
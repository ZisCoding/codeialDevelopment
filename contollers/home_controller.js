const mongoose = require('mongoose');
const Post = require("../models/post")

//exporting different actions to be used 

module.exports.home=function (req, res){

    // populate will insert the user to the recieved post obj corresponding to the user id in the user field of post
    Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate:{ // nesting the populate
            path: 'user'
        }
    })
    .exec()
    .then((posts)=>{
        return res.render('home.ejs',{
            title:"Home",
            user:req.user,
            posts:posts
        });
    })
    .catch((err)=>{
        console.log("error in finding posts",err);
    })

    
    
}

module.exports.about=function (req, res){
    return res.end('<h1>This is the about</h1>');
}


/*
we can also export it like this

function home(req, res){
    return res.end('<h1>Express is up for codeial</h1>');
}

function home1(req , res){
    return res.end('<h1>Express is up for codeial2</h1>');
}

module.exports = {
    home,
    home1
}
*/
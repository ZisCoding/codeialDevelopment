const mongoose = require('mongoose');
const Post = require("../models/post")
const User = require('../models/user');
//exporting different actions to be used 

module.exports.home= async function (req, res){

    // populate will insert the user to the recieved post obj corresponding to the user id in the user field of post
   try{
        let posts = await Post.find({})
        .sort('-createdAt') // sorting in the recent post to late post order 
        .populate('user')
        .populate({
            path : 'comments',
            populate:{ // nesting the populate
                path: 'user'
            }
        })
        
        // finding all users to show on the the home page
        let users = await User.find()

        return res.render('home.ejs',{
            title:"Home",
            user:req.user,
            posts:posts,
            all_users: users
        });
   }catch(err){
        console.log("Error",err);
        
        return;
   }
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
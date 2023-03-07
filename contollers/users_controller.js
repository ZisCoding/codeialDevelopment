const User = require('../models/user');

module.exports.profile = function(req,res){

    // it checks if there is some user who got logged in 
    if(req.cookies.user_id){
        // find that user in db
        User.findById(req.cookies.user_id)
        .then((user)=>{
            // if we find that user
            if(user){
                return res.render('user_profile',{
                    title: 'Profile',
                    user: user
                });
            }
            // if user not found go back to sing in
            return res.redirect('/users/sign-in');
        })
        .catch((err)=>{
            console.error("Error in finding user",err);
            return res.redirect('/users/sign-in');
        });
    }
    // if there is no sign in request
    else
        return res.redirect('/users/sign-in');
}

module.exports.timeLine = function(req,res){
    res.end('<h1>user Timeline</h1>');
}

module.exports.signUp = function(req,res) {

    res.render('user_sign_up.ejs',{
        title: 'signup'
    });
}

module.exports.signIn = function(req,res) {

    res.render('user_sign_in.ejs',{
        title: 'signup'
    });
}

// creating a user from the data recieved 
module.exports.create = function(req,res){
    
    if(req.body.password != req.body.confirmPassword){
        return res.redirect('back');
    }

    // finding the user 
    User.findOne({email: req.body.userName})
    .then((user)=>{
        // if user id not present
        if(!user){
        //    create a new user and 
            User.create({
                email:req.body.email,
                password: req.body.password,
                name: req.body.name
            })
            // if created succesfully redirect to sign in page
            .then(()=>{ 
                return res.redirect('/users/sign-in');
            })
            // if not created successfully redirect back
            .catch((err)=>{
                console.log("error in creating user"); 
                return res.redirect('back');
            });
            // if user is alredy present redirect to sign in page
        }else{
            return res.redirect('/users/sign-in');
        }
         
    })
    // if any error in finding the user 
    .catch((err)=>{
        console.log("error in finding user at sign up"); 
        return res.redirect('back');
    });

}

// signing in and creating a session
module.exports.createSession = function(req,res){
   
    // find the user
    User.findOne({email: req.body.email})
    .then((user)=>{
        // if user found then do this
        if(user){
            // if password is incorrect
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            // if password is correct create a session and send the user to home
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
            
        }
        // if user not found then do this
        else{
            res.redirect('back');
        }

    })
    // if error in finding user then do this
    .catch((err)=>{
        console.error("Error in finding user",err);
    })
    
}

module.exports.endSession = function(req,res){

    // clearing the cookie which is used to sigin in the user so they will get sign-out
    res.clearCookie('user_id')

    res.redirect('/users/sign-in');
}
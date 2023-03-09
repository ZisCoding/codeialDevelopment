const User = require('../models/user');

module.exports.profile = function(req,res){
    res.render('user_profile.ejs',{
        title:"profile",
        user:req.user//accesding the user which we set in response at passport config(setAuthenticatedUser)
    });
}

module.exports.timeLine = function(req,res){
    res.end('<h1>user Timeline</h1>');
}

module.exports.signUp = function(req,res) {

    // if users is already signed in then redirect to profile
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }

    res.render('user_sign_up.ejs',{
        title: 'signup'
    });
}

module.exports.signIn = function(req,res) {

    // if users is already signed in then redirect to profile
   if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }

    res.render('user_sign_in.ejs',{
        title: 'signup'
    });
}

module.exports.create = function(req,res){
    
    if(req.body.password != req.body.confirmPassword){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email})
    .then((user)=>{
        
        if(!user){
           
            User.create({
                email:req.body.email,
                password: req.body.password,
                name: req.body.name
            })
            .then(()=>{
                return res.redirect('/users/sign-in');
            })
            .catch((err)=>{
                console.log("error in creating user",err); 
                return res.redirect('back');
            });
        }else{
            return res.redirect('/users/sign-in');
        }
         
    })
    .catch((err)=>{
        console.log("error in finding user at sign up"); 
        return res.redirect('back');
    });

}


module.exports.createSession = function(req,res){
    return res.redirect('/users/profile');
}

module.exports.destroySession = function(req,res,next){
     
    // this function is givin by passport
     req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });

    return res.redirect('/');
}

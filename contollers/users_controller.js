const User = require('../models/user');

module.exports.profile = function(req,res){
    res.render('user_profile.ejs',{
        title:"profile"
    });
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

module.exports.create = function(req,res){
    
    if(req.body.password != req.body.confirmPassword){
        return res.redirect('back');
    }

    User.findOne({email: req.body.userName})
    .then((user)=>{
        
        if(!user){
           
            User.create({
                email:req.body.userName,
                password: req.body.password,
                name: req.body.name
            })
            .then(()=>{
                return res.redirect('/users/sign-in');
            })
            .catch((err)=>{
                console.log("error in creating user"); 
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

}
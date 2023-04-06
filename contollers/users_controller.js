const User = require('../models/user');

module.exports.profile = function(req,res){

    User.findById(req.params.id)
    .then((user)=>{
        res.render('user_profile.ejs',{
        title:"profile",
        user:req.user,//accessing the user which we set in response at passport config(setAuthenticatedUser)
        profile_user: user
        });
    })
}

module.exports.update = async function(req,res){
    // checking if the user in params is same as the logged in user 
    if(req.user.id==req.params.id){

        let user = await User.findById(req.params.id);

        // here we are accessing the static funtion we defined inside User model also the multer middleware will be called with that
        User.uploadedAvatar(req , res , function(error){
            if(error){
                console.log("**** Multer Error: ",error);
                res.redirect('back');
            }
            user.name=req.body.name;
            user.email=req.body.email;
            // if there is any file
            if(req.file){
                // saving the path of saved file to the db 
                user.avatar = User.avatarPath+'/'+req.file.filename; // avatarPath static variable was also declared at user model
            }
            
            user.save();
        });

        res.redirect('back');
    }else{
        // sending this error if some fidelled in the front end
        res.status(401).send('Unauthorized');
    }
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
        console.log(req.user.id);
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
    req.flash('success','Logged in Successfull');
    return res.redirect(`/users/profile/${req.user.id}`);
}

module.exports.destroySession = function(req,res,next){
     
    // this function is givin by passport
     req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success','Logged out Successfull')
        res.redirect('/');
      });

}


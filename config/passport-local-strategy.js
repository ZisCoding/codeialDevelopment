// requring passport or we can say creating an object/instance whatever the passport module is exporting
const passport = require('passport');

// requring the passport local strategy
const localStrategy = require('passport-local').Strategy;

// requring User model
const User = require('../models/user')

//defining the local strategy in the passport object which we created in the starting for authentication
passport.use(new localStrategy({
    usernameField: 'email', // telling to look at email property of request for the username
    passwordField:'password'// telling to look at password property of request for the password
    },

    // the password and username fetched above will be passed to this cb function
    function(email,password,done){
        //finding the user
        User.findOne({email: email})
        .then((user)=>{
            // if user found and password is correct then return user
            if(user && user.password==password){
                console.log("Authentication complete");
                return done(null,user);
            }
            // if user not found or password is incorrect
            else{
                console.log("Invalid Username/Password");
                return done(null,false);
            }
        })
        // if error in finding user
        .catch(err=>{
            console.log("Error in finding user --> passport");
            return done(err);
        });
    }
));


passport.serializeUser((user , done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then((user)=>{
        return done(null,user);
    })
    .catch((err)=>{
        console.log("Error in finding user --> passport");
        return done(err);
    })
});

// authentication is completed 

// other methods 

// defining a method in passport object to check if user is authenticated
passport.checkAuthentication = function(req, res, next){
    // checking is user is signed in then pass on the req to the next function(cotroller's action)
    if(req.isAuthenticated()){
        return next();   
    }

    //if user is not signed in
    res.redirect('/users/sign-in');
}

// setting the authenticated user to the req so we can use the user data in views
passport.setAuthenticatedUser = function(req, res, next){
    // if user is signed in then setting the res user to the authenticated user
    if(req.isAuthenticated()){
        res.locals.user = req.user //authenticated user is set to the request by the passport 
    }
    return next();
}



module.exports = passport;
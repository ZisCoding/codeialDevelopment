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

module.exports = passport;
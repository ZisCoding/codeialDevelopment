const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//telling passport to use the google strategy for signin/signup via google
passport.use(new googleStrategy({
    clientID: "90332067414-thfuu5c071pts7obge95bqgndko5gp6k.apps.googleusercontent.com", // get this id from google cloiud api
    clientSecret: "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", // get this from google cloud api
    callbackURL: "http://localhost:8000/users/auth/google/callback", // after user will signin and agree on google server then google server will direct us to this callbacl url
    },

    function(accessToken, refreshToken, profile, done){
        // finding the user returned b google
        User.findOne({email: profile.emails[0].value})
        .then((user)=>{
            if(user){
                // if user found set this as req.user(signin the user)
                return done(null , user);
            }else{
                // if user not found create the user in db and set this as req.user(signin the user)
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                })
                .then((user)=>{
                    return done(null, user);
                })
                .catch((error)=>{
                    console.log("error in creating user",error);
                    return;
                })
            }
        })
        .catch((error)=>{
            console.log("error in google passport-strategy",error);
            return;
        });
    }
));


module.exports = passport;
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let options = {
    // it will extact the jwt token form the header of the request 
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    // this will be used for encryption and decryption
    secretOrKey: 'codeial' 
}

// jwt is made up of 3 components head, payload, signature

passport.use(new JWTStrategy(options , function(jwtPayload , done){
        
        User.findById(jwtPayload._id)
        .then(user=>{
            if(user){
                return done(null,user);
            }{
                return done(null,false);
            }
        })
        .catch((error)=>{
            console.log("error in finding user",error);
            return ;
        });

}));

module.exports = passport;
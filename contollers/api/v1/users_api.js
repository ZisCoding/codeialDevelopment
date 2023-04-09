const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

// this function is authenticating the user and making a jwt 
module.exports.createSession = async function(req,res){
    
    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
           return res.json(401,{
                message: "Username or password is incorrect"

            });
        }

        return res.json(200, {
            message:"Here is your JWT keep it safe",
            data: {
                // user will get encrypted here using the codeial key into the jwtpayload and expires in is the age of jwt 
                token: jwt.sign(user.toJSON(),'codeial',{expiresIn : 100000})
            }
        });

    }catch(error){
        res.status('500').json({
            message: "Error in finding user" + error
        });
    }
    
}
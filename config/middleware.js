module.exports.setFlash = function (req , res , next){
    // inserting the flash messages into the response from the req
    res.locals.flash={
        'success' : req.flash('success'),
        'error' : req.flash('error')
    }   
    
    next();
}
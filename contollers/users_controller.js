module.exports.profile = function(req,res){
    res.render('user_profile.ejs',{
        title:"profile"
    });
}

module.exports.timeLine = function(req,res){
    res.end('<h1>user Timeline</h1>');
}
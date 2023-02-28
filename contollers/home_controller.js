//exporting different actions to be used 

module.exports.home=function (req, res){
    return res.end('<h1>Express is up for codeial</h1>');
}

module.exports.about=function (req, res){
    return res.end('<h1>This is the about</h1>');
}


/*
we can also export it like this

function home(req, res){
    return res.end('<h1>Express is up for codeial</h1>');
}

function home1(req , res){
    return res.end('<h1>Express is up for codeial2</h1>');
}

module.exports = {
    home,
    home1
}
*/
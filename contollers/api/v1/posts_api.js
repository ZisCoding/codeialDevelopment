module.exports.index = (req , res)=>{
    return res.json(200,{
        message : "List of posts v1",
        posts: []
    });
}
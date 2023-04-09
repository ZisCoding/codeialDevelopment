module.exports.index = (req,res)=>{
    return res.json(200,{
        message: "list of post v2",
        posts: []
    });
}
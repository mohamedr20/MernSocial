let Post = require('./post.model');

module.exports = {
    create:function(req,res){
        let newPost = new Post({
            slug:req.body.slug,
            title:req.body.title,
            description:req.body.description
        })
        Post.addPost(newPost,(err,post)=>{
            if(err){
                res.json({success:false,msg:"Failed to save post"})
            }
            res.status(201).json({success:true,msg:"Post saved successfully"})
        })
    },
    fetch:function(req,res,next){
        Post.find({}).limit(req.params.limit).exec()
        .then((post)=>{
            res.status(200).json(post)
        })
        .catch(next)
    }
}
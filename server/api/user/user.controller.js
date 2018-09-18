let User = require('./user.model');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const passport = require('passport');

module.exports = {
    login:function(req,res){
        const email = req.body.email;
        const password = req.body.password;

        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(404).json({msg:'User not found'})
            }
            bcrypt.compare(password,user.password)
                .then(isMatch=>{
                    if(isMatch){
                        //User Matched
                        const payload = {id:user.id,name:user.name,avatar:user.avatar};
                        //Sign the token
                        jwt.sign(payload,config.secretOrKey,{expiresIn:3600},(err,token)=>{
                            res.status(200).json({
                                success:true,
                                token:'Bearer '+token
                            })
                        });
                    }
                    else{
                        return res.status(400).json({password:'Incorrect Password'})
                    }
                })
        })
    },
    register:function(req,res){
        User.findOne({email:req.body.email})
        .then(user =>{
            if(user){
                return res.status(400).json({email:'Email already exists'})
            }
            else{
                const avatar = gravatar.url(req.body.email,{
                    s:'200',
                    r:'pg',
                    d:'mm'
                })
                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    avatar:avatar,
                    date:req.body.date
                })

                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user=>{res.status(201).json(user)})
                            .catch(err=>console.log(err))
                    })
                })
            }
        })
    },
    create:function(req,res){
        let newUser = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            avatar:req.body.avatar,
            date:req.body.date
        })
        User.addUser(newUser,(err,user)=>{
            if(err){
                res.json({success:false,msg:"Failed to save user"})
            }
            res.status(201).json({success:true,msg:"User saved successfully"})
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

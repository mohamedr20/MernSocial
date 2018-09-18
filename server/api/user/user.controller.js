let User = require('./user.model');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const passport = require('passport');
const validateRegisterInput = require('../../validators/register');
const validateLoginInput = require('../../validators/login');


module.exports = {
    login:function(req,res){
        const { errors, isValid } = validateLoginInput(req.body);
      
        // Check Validation
        if (!isValid) {
          return res.status(400).json(errors);
        }
      
        const email = req.body.email;
        const password = req.body.password;
      
        // Find user by email
        User.findOne({ email }).then(user => {
          // Check for user
          if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
          }
          // Check Password
          bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
              // User Matched
              const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload
              // Sign Token
              jwt.sign(
                payload,
                config.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  });
                }
              );
            } else {
              errors.password = 'Password incorrect';
              return res.status(400).json(errors);
            }
          });
        });
      },
    register:function(req,res){
        const {errors,isValid}  = validateRegisterInput(req.body);
        if(!isValid){
            return res.status(400).json(errors);
        }
        User.findOne({email:req.body.email})
        .then(user =>{
            if(user){
                errors.email = "Email already exsists"
                return res.status(400).json(errors);
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

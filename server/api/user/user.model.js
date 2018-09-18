const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})


module.exports.addUser = function(newUser,callback){
    newUser.save(callback)
}
module.exports.addUserPromise = function(newPost){
    return new Promise((resolve,reject)=>{
        if(resolve){
            return newPost
        }
        throw new Error(reject);
    })
}
module.exports = User = mongoose.model('Users',userSchema);
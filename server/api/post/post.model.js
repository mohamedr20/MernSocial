
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const mongoose_unique = require('mongoose-unique-validator');

let postSchema  = new Schema({
    slug:String,
    title:String,
    description:String
},{timestamps:true})

const Article = module.exports = mongoose.model('Post',postSchema);

module.exports.addPost = function(newPost,callback){
    newPost.save(callback)
}
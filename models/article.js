var mongoose=require('mongoose');
var blogArticle=require('../schemas/article');

var blogArticle=module.exports=mongoose.model('blogArticle',blogArticle)
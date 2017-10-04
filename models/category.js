var mongoose=require('mongoose');
var blogCategory=require('../schemas/category');

var Category=module.exports=mongoose.model('Category',blogCategory)
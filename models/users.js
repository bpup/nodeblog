var mongoose=require('mongoose');
var userSchemas=require('../schemas/users');

var User=module.exports=mongoose.model('User',userSchemas)
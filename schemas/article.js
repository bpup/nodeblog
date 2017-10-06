var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var blogArticle= new Schema({
    title:String,
    titleImg:String,
    body:String,
    introduction:String,
    comments:[{
      username:String,
      comment:String,
      date:String
    }],    
    views:Number,
    likes:Number,
    tags:String,
    date: { type: Date, default: Date.now }
  });

  module.exports=blogArticle
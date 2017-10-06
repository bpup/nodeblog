var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var blogCategory= new Schema({
    category:String,
    date: { type: Date, default: Date.now }
  });

  module.exports=blogCategory
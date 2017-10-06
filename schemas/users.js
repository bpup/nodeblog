var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    username:String,
    password:String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });

  module.exports=blogSchema
var bodyParser = require('koa-body')();
var User=require('../models/users');
var routerlogin =module.exports= require('koa-router')();

routerlogin.post('/api/register', bodyParser,
async (ctx) => {
 var body=ctx.request.body
 var username=body.username;
 var password=body.password;
 var email=body.email;
 await User.findOne({ username: username }).then(function(userInfo){
     if(userInfo){
       return 'has sign'
     }else{
         var user=new User({
             username:username,
             password:password,
             email:email,
         })
         return user.save()
     }
 }).then(function(userInfo){
     if(userInfo=='has sign'){
       ctx.body={code:0,msg:'用户名已注册'}
     }else{
       ctx.cookies.set(
           'cid', 
           userInfo.cid,
           {
             maxAge: 60 * 60 * 1000, // cookie有效时长
             expires: new Date('2017-02-15'),  // cookie失效时间
             httpOnly: false,  // 是否只用于http请求中获取
             overwrite: false  // 是否允许重写
           }
         )

       ctx.body={code:1,msg:'注册成功',username:username}
     }
   
 })

})
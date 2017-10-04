var bodyParser = require('koa-body')();
var User=require('../models/users');
var routerRegister =module.exports= require('koa-router')();

routerRegister.post('/api/login', bodyParser,
async (ctx) => {
  var body=ctx.request.body
  var username=body.username;
  var password=body.password;
    await User.findOne({
      username: username,
      password: password
 }).then(function(userInfo){
       if(!userInfo){
         return '该账号未注册，请注册'
       }else{
           return {msg:'登陆成功',userInfo:userInfo} 
       }
   }).then(function(userInfo){
       if(userInfo=='该账号未注册，请注册'){
         ctx.body={code:0,msg:'该账号未注册或者输入错误'}
       }else{
         ctx.cookies.set(
             'cid', 
             userInfo.userInfo._id,
             {
               maxAge: 60 * 60 * 1000, // cookie有效时长
               expires: new Date('2017-02-15'),  // cookie失效时间
               httpOnly: false,  // 是否只用于http请求中获取
               overwrite: false  // 是否允许重写
             }
           )
         ctx.body={code:1,msg:'登陆成功',username:username}
       }
     
   })
})
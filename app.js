var koa = require('koa');
var app = new koa();
var swig=require('swig');
var path = require('path');
// var route=require('koa-route');
const serve = require('koa-static');  //静态文件托管
var mongoose=module.exports=require('mongoose');

//路由
var routerMain=require('./routers/main'); 
var routerlogin=require('./routers/login')
var routerRegister=require('./routers/register')
var routerlogout=require('./routers/logout')
var routerAdmin=require('./routers/admin/admin')
var routerCategory=require('./routers/admin/category')
var routerCategoryPost=require('./routers/admin/categorypost')
var routerCategoryEdit=require('./routers/admin/edit')
var routerCategoryDelet=require('./routers/admin/delet')
var routerArticle=require('./routers/article')
var routerAdminAticle=require('./routers/admin/article')
var routerPostArticle=require('./routers/postarticle')
var routerLikeAdd=require('./routers/likeadd')
var routerComments=require('./routers/comments')
var routerAdminComments=require('./routers/admin/comment')
var routerCommentsDelet=require('./routers/admin/deletcomment')

//Koa
//需要引入co-views中间件
var views = require('koa-views');
app.use(views(__dirname + '/views', {
    map: {
      html: 'swig'
    }
  }))



//路由中间件

app.use(routerlogin.routes());
app.use(routerRegister.routes());
app.use(routerMain.routes())
app.use(routerlogout.routes())
app.use(routerAdmin.routes())
app.use(routerCategory.routes())
app.use(routerCategoryPost.routes())
app.use(routerCategoryEdit.routes())
app.use(routerCategoryDelet.routes())
app.use(routerArticle.routes())
app.use(routerAdminAticle.routes())
app.use(routerPostArticle.routes())
app.use(routerLikeAdd.routes())
app.use(routerComments.routes())
app.use(routerAdminComments.routes())
app.use(routerCommentsDelet.routes())


app.use(serve(path.join(__dirname,'/public')))  //   静态文件，直接读取目录下的文件，访问/css/main.css
  
  

mongoose.connect('mongodb://localhost:27017/blognode', function(err){
    if(err){
        console.log(err)
    }else{
        console.log('mongose成功连接')
    }
   app.listen(3000);
});


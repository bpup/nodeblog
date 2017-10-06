
var User=require('../models/users');
var blogCategory=require('../models/category');
var blogArticle=require('../models/article');
var routerMain =module.exports= require('koa-router')();


function unique(arr,condition){
    var map=new Map();
    return arr.filter(
        (a)=>{
            return !map.has(a[condition])&&map.set(a[condition],1)
        }
    )

}
routerMain.get('/',async ctx => {
    if(ctx.request.header.cookie&&ctx.request.header.cookie.split('=')[1]){
       var cookies=ctx.request.header.cookie.split('=');
       var cid=cookies[1]
       var getUser=()=>User.findOne({
                _id:cid
            })
       var getCategory=()=>blogCategory.find()
       var getArticleList=()=>blogArticle.find()      
       await Promise.all([getUser(), getCategory(),getArticleList()]).then(function(res){  //并发
         if(res[1]){
            return ctx.render('index',
            {
             userInfo:res[0],
             categorys:unique(res[1],'category'),
             articleList:unique(res[2],'title'),
            
            },
            function(err){
                console.log(err)
            })
         }else{
            return ctx.render('index',
            {
             userInfo:res[0]            
            },
            function(err){
                console.log(err)
            })   
         }
       
     
       });  
   
    }else{
         return ctx.render('index.html',
             function(err){
                 console.log(err)
             })
    }
  
   

})





var blogArticle=require('../models/article');
var User=require('../models/users');
var routerArticle =module.exports= require('koa-router')();

function unique(arr){
    var map=new Map();
    return arr.filter(
        (a)=>{
            return !map.has(a.category)&&map.set(a.category,1)
        }
    )

}
routerArticle.get('/blog/article',async ctx => {
    if(ctx.request.header.cookie&&ctx.request.header.cookie.split('=')[1]&&ctx.request.query.articleid){
       var cookies=ctx.request.header.cookie.split('=');
       var cid=cookies[1]
       var articleid=ctx.request.query.articleid
       var getUser=()=>User.findOne({
            _id:cid
        })
       var getArticle=()=>blogArticle.findOne({ _id:articleid})
       await Promise.all([getUser(),getArticle()]).then(function(res){
       var oldviews=res[1].views
       blogArticle.update(
        { _id:articleid}
       ,{views:Number(oldviews)+1},function(err,res){
           console.log(err,res)
       })
       
        return ctx.render('postblog',{
            userInfo:res[0],
            articel:res[1]
        },
        function(err){
            console.log(err)
        })  
       })
        
      
         }else{
            return ctx.render('postblog',
            function(err){
                console.log(err)
            })   
         }
       
     
       });  

  
   



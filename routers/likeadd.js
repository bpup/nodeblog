var blogArticle=require('../models/article');
var routerLikeAdd =module.exports= require('koa-router')();


routerLikeAdd.get('/api/addlike',async ctx => {
    if(ctx.request.header.cookie&&ctx.request.header.cookie.split('=')[1]){
        var queryid=ctx.request.query.cid
        
       await blogArticle.find({
            _id:queryid
        }).then(function(res){
             blogArticle.update({
                _id:queryid
            },{
                likes:Number(res[0].likes)+1
            },function(err,res){
                console.log(err,res)
            })
        })
        ctx.body={
            code:1,
            msg:'点赞成功'
        }
    
         }
       
     
       });  

  
   



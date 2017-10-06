
var blogArticle=require('../models/article');
var User=require('../models/users');
var routerComments =module.exports= require('koa-router')();
var bodyParser = require('koa-body')();

function unique(arr){
    var map=new Map();
    return arr.filter(
        (a)=>{
            return !map.has(a.category)&&map.set(a.category,1)
        }
    )

}

routerComments.post('/api/leavecommet',bodyParser,async ctx => {
    if(ctx.request.header.cookie&&ctx.request.header.cookie.split('=')[1]){
       var cookies=ctx.request.header.cookie.split('='),
           comment=ctx.request.body.comment,
           cid=cookies[1],
           nowdate=new Date(),
           articleid=ctx.request.header.referer.split('=')[1];
          User.findOne({_id:cid}).then(function(res){
              if(res.username){
                  let name=res.username;
                  blogArticle.findOne({_id:articleid}).then(function(res){
                      if(res){
                         var newComments={
                             username:name,
                             comment:comment,
                             date:nowdate
                         } 
                        var newcommentArr=res.comments;
                        newcommentArr.push(newComments)                        
                        blogArticle.update({_id:articleid},{
                            comments:newcommentArr
                        },function(err,res){
                            console.log(err,res)
                        })
                      }
                  })
              }
          })
           
      
         }
       });  

  
   



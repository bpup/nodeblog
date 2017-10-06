var bodyParser = require('koa-body')();
var blogArticle=require('../models/article');
var routerPostArticle =module.exports= require('koa-router')();

routerPostArticle.post('/api/psotarticle', bodyParser,
async (ctx) => {
 var body=ctx.request.body
 var title=body.title;
 var tags=body.tags;
 var content=body.content;
 var introduction=body.introduction;
 var article=new blogArticle({
    title:title,
    body:content,
    tags:tags,
    likes:0,
    comments:[],
    views:0,
    introduction:introduction
});
 await article.save().then(function(res){
    if(res){
       ctx.body={
           code:1,
           msg:'文章提交成功'
       } 
    }
 })

})
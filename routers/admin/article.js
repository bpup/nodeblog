var routerAdminAticle=module.exports= require('koa-router')();
const HTMLDecoderEncoder = require("html-encoder-decoder");
var blogArticle=require('../../models/article')
routerAdminAticle.get('/admin/article', 
  async (ctx) => {
     if(ctx.request.header.cookie){
        var id=ctx.request.header.cookie.split('=')[1];
            if(id=='59d3710d937134384005545b'){
              var query=Number(ctx.request.query.page)||1;
              var disabled;
              var limit=12;
              var count;
              var index;
            await blogArticle.count().then(function(count){
                    index=Math.ceil(count/limit); 
                    query=Math.min(index,query)
                    query=Math.max(1,query)
                    var skip=(query-1)*limit;
                    return blogArticle.find().limit(limit).skip(skip)
              }).then(function(res){
                //   console.log(HTMLDecoderEncoder.encode(res,'res'))
                return ctx.render('./admin/article',
                {articles:res,
                 page:query,
                 index:index,
                 limit:limit
                },
                function(err){
                    console.log(err)
                })
            })
         
               
            }else{
                ctx.body='not admin,not allow'
            }
      
     }else{
        ctx.body='not admin,not allow'
     }
})
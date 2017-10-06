var routerAdminComments=module.exports= require('koa-router')();
var blogArticle=require('../../models/article')
routerAdminComments.get('/admin/comments', 
  async (ctx) => {
     if(ctx.request.header.cookie){
        var id=ctx.request.header.cookie.split('=')[1];
            if(id=='59d3710d937134384005545b'){
              var query=Number(ctx.request.query.page)||1;
              var limit=12;
              var count;
              var index;
              await blogArticle.where('comments').then(function(res){
               var allComment=res.map(function(a){
                      return a.comments
                  })
                  allComment=Array.prototype.concat.apply([],allComment);  //多维化为一维数组
                  count=allComment;
                  index=Math.ceil(count/limit); 
                  query=Math.min(index,query);
                  query=Math.max(1,query);
                  return ctx.render('./admin/comment',
                  {
                   comments:allComment,
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


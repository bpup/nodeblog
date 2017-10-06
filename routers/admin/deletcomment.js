

var routerCommentsDelet=module.exports= require('koa-router')();
var blogArticle=require('../../models/article')
routerCommentsDelet.get('/admin/api/deletcomment',
  async (ctx) => {
   if(ctx.request.header.cookie){
      var id=ctx.request.header.cookie.split('=')[1];
          if(id=='59d3710d937134384005545b'){
            var comment=ctx.request.query
            var commentid=comment.id;   
            console.log(comment,commentid)
            ctx.body={code:1,msg:'删除成功'}
            blogArticle.find({
                "comments._id":commentid
            }).then(function(res){
                
               var newcomment=res[0].comments.filter((e)=>{
                    return e._id!=commentid
                })                
                blogArticle.update({
                    "comments._id":commentid
                },{
                    comments:newcomment
                },function(err,res){
                    console.log(err,res)
                })
            })
          }else{
              ctx.body='not admin,not allow'
          }
    
   }else{
      ctx.body='not admin,not allow'
   }
})
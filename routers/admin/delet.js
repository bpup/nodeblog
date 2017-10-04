var routerCategoryDelet=module.exports= require('koa-router')();
var Category=require('../../models/category')
routerCategoryDelet.get('/api/delet',
  async (ctx) => {
   if(ctx.request.header.cookie){
      var id=ctx.request.header.cookie.split('=')[1];
          if(id=='59d3710d937134384005545b'){
            var category=ctx.request.query
            var cagegoryid=category.cid;            
           await Category.remove({
                _id:cagegoryid
            },function(err,res){
                if(!err){
                ctx.body={
                        code:1,
                        msg:'已清除'
                    }   
                }
               
            })
          }else{
              ctx.body='not admin,not allow'
          }
    
   }else{
      ctx.body='not admin,not allow'
   }
})
var routerCategoryEdit=module.exports= require('koa-router')();
var bodyParser = require('koa-body')();
var Category=require('../../models/category')
routerCategoryEdit.get('/api/edit',
  async (ctx) => {
   if(ctx.request.header.cookie){
      var id=ctx.request.header.cookie.split('=')[1];
          if(id=='59d3710d937134384005545b'){
            var category=ctx.request.query
            var cagegoryid=category.cid;            
            var cagegoryName=category.category;    
            var cagegoryNew=category.valueChange;  
            await Category.update({_id:cagegoryid},{
                category:cagegoryNew
            }).then(()=>{ ctx.body={
                code:1,
                msg:'修改成功',
                category:cagegoryName
            }
            })             
          }else{
              ctx.body='not admin,not allow'
          }
    
   }else{
      ctx.body='not admin,not allow'
   }
})
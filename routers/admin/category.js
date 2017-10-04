var routerCategory=module.exports= require('koa-router')();
var Category=require('../../models/category')

function unique(arr){
    var map=new Map();
    return arr.filter(
        (a)=>{
            return !map.has(a.category)&&map.set(a.category,1)
        }
    )

}
routerCategory.get('/admin/category', 
  async (ctx) => {
     if(ctx.request.header.cookie){
        var id=ctx.request.header.cookie.split('=')[1];
            if(id=='59d3710d937134384005545b'){
              await Category.find().then(function(res){
                    return ctx.render('./admin/category',
                    {
                        categorys:unique(res)
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

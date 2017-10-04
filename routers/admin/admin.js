var routerAdmin=module.exports= require('koa-router')();
var User=require('../../models/users')
routerAdmin.get('/admin', 
  async (ctx) => {
     if(ctx.request.header.cookie){
        var id=ctx.request.header.cookie.split('=')[1];
            if(id=='59d3710d937134384005545b'){
              var query=Number(ctx.request.query.page)||1;
              var disabled;
              var limit=12;
              var count;
              var index;
            await User.count().then(function(count){
                    index=Math.ceil(count/limit); 
                    query=Math.min(index,query)
                    query=Math.max(1,query)
                    var skip=(query-1)*limit;
                    return User.find().limit(limit).skip(skip)
              }).then(function(res){
                return ctx.render('./admin/index',
                {users:res,
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
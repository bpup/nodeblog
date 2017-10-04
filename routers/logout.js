var routerlogout=module.exports= require('koa-router')();

routerlogout.get('/api/logout',
 (ctx) => {
    ctx.cookies.set('cid',null)
    ctx.body={code:1,msg:'退出成功'}    
})
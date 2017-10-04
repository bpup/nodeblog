
var User=require('../models/users');
var blogCategory=require('../models/category');
var routerMain =module.exports= require('koa-router')();


function unique(arr){
    var map=new Map();
    return arr.filter(
        (a)=>{
            return !map.has(a.category)&&map.set(a.category,1)
        }
    )

}
routerMain.get('/',async ctx => {
    if(ctx.request.header.cookie&&ctx.request.header.cookie.split('=')[1]){
       var cookies=ctx.request.header.cookie.split('=');
       var cid=cookies[1]
       var getUser=()=>User.findOne({
                _id:cid
            })
       var getCategory=()=>blogCategory.find()

     await Promise.all([getUser(), getCategory()]).then(function(res){  //并发
        console.log(res)
         if(res[1]){
            return ctx.render('index',
            {
             userInfo:res[0],
             categorys:unique(res[1])
            
            },
            function(err){
                console.log(err)
            })
         }else{
            return ctx.render('index',
            {
             userInfo:res[0]            
            },
            function(err){
                console.log(err)
            })   
         }
       
     
       });  
   
    }else{
         return ctx.render('index.html',
             function(err){
                 console.log(err)
             })
    }
  
   

})






// 登陆登出逻辑
$(function(){
    var signin=document.querySelector('.signin'),
    signup=document.querySelector('.signup'),
    inblock=document.querySelector('.signalertin'),
    upblock=document.querySelector('.signalertup'),
    model=document.querySelector('.signmodel'),
    submitup=document.querySelector('#submitup'),
    submitin=document.querySelector('#submitin');
    
    if(signin){
        signin.addEventListener('click',function(e){
            model.style.display='block';
            inblock.style.display='block';
        
        })
    }
   if(signup){
    signup.addEventListener('click',function(e){
        model.style.display='block';
        upblock.style.display='block';
    })
   }
   if(model){
    model.addEventListener('click',function(e){
        model.style.display='none';
        inblock.style.display='none'
        model.style.display='none';
        upblock.style.display='none'
    })
   }
    if(submitin){
        submitin.addEventListener('click',function(e){  //登陆
            model.style.display='none';
            inblock.style.display='none'
            e.preventDefault();
            var username=inblock.querySelector('#usernamein').value,
                password=inblock.querySelector('#passwordin').value;
                if((!username&&!username.trim())||(!password&&!password.trim())){
                    alert('表单不能为空')
                }else{
                    $.ajax({
                        method :'post',
                        url:'/api/login',
                        data:{
                            username:username,
                            password:password,
                        },
                        dataType:'json',
                        success:function(res){
                            if(res.code===1){
                                signin.style.display='none'
                                signup.style.display='none'
                                window.location.reload()   //刷新你重载'/'
                            }else if(res.code===0){
                                alert(res.msg)
                            }
                        }
                    })
                }  
        })
    }
  if(submitup){
    submitup.addEventListener('click',function(e){   //注册
        e.preventDefault()
        model.style.display='none';
        upblock.style.display='none';
        var username=upblock.querySelector('#usernameup').value,
            password=upblock.querySelector('#passwordup').value,
            email=upblock.querySelector('#emailup').value;
            if((!username&&!username.trim())||(!password&&!password.trim())||(!email&&!email.trim())){
                alert('表单不能为空')
            }else{
                $.ajax({
                    method :'post',
                    url:'/api/register',
                    data:{
                        username:username,
                        password:password,
                        email:email
                    },
                    dataType:'json',
                    success:function(res){
                        if(res.code===1){
                            signin.style.display='none'
                            signup.style.display='none'
                            window.location.reload()  
                        }else if(res.code===0){
                            alert(res.msg)
                        }
                    }
                })
            }    
    })
}
        $('.logout').on('click',function(){
            $.get('/api/logout',function(res){
                if(res.code===1){
                    window.location.assign('/')
                    alert('退出成功')
                }
            })
        })
        $('.meta_likes').on('click',function(e){
            var eid=$(e.target).parent().parent().prev().text()
            $.get('/api/addlike?cid='+eid,function(res){
                if(res.code===1){
                    var likesNum=$(e.target).text()
                    var nowNum=Number(likesNum)+1
                    $(e.target).text(nowNum)
                }
            })
        })
        $('.submit').on('click',function(e){
            var value=$('.comment_form').val();
            if(!value.trim()||value==='COMMENT *'){
                alert('评论不能为空！')
            }
            $.ajax({
                url:'/api/leavecommet',
                method:'post',
                data:{
                    comment:value
                },
                success:function(res){
                    console.log(res)
                },
                error:function(err){
                    console.log(err.toString())
                },
                complete:function(){
                    window.location.reload()
                }
            })
        })
      
            
            /*---------------------------------------------- 
                           I M G   H O V E R
            ------------------------------------------------*/
            /* SETTINGS */
            var hoverFade = 300;	
                
            // check if .overlay already exists or not
            $('.img_holder a').each(function(index){
                if($(this).find('.overlay').length == 0) { 
                    $(this).append('<div class="overlay"></div>');
                    $(this).find('.overlay').css({ opacity: 0 });
                } 										
            });
            
            $('.img_holder').hover(function(){
                $(this).find('.overlay').animate({ opacity: 0.5 }, hoverFade);
            }, function(){
                $(this).find('.overlay').animate({ opacity: 0 }, hoverFade);
            });
            
                
        
})




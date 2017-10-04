
// 登陆登出逻辑
!function(){
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
   
    model.addEventListener('click',function(e){
        model.style.display='none';
        inblock.style.display='none'
        model.style.display='none';
        upblock.style.display='none'
    })
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
                            window.location.reload()   //刷新也买你重载'/'
                        }else if(res.code===0){
                            alert(res.msg)
                        }
                    }
                })
            }  
    })
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
    
        $('#signout').on('click',function(){
            $.get('/api/logout',function(res){
                if(res.code===1){
                    window.location.reload()
                    alert('退出成功')
                }
            })
        })
        

}()




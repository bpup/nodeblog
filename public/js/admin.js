$(function(){
   var addbtn=$('#add')
   $('.formedit').hide()   
   addbtn.on('click',function(e){
        $('.warn').text('');
        var value=$('.form-control').val();
        if(value==''||value.trim()==''){
            $('.form-group1').addClass('has-error');
            $('.warn1').text('输入不能为空');
            e.preventDefault()
        }
   })

   $('.catagoryChange').on('click',function(e){
         $('.formedit').show()   
         target=$(e.target).parent().prev().text()
         targetid=$(e.target).parent().prev().prev().text()
         if($('.formedit').css('display')==='block'){
            $('#edit').on('click',function(ev){
                 var value=$('#category-edit').val()
                 if(value==''||value.trim()==''){
                 $('.form-group2').addClass('has-error');
                 $('.warn2').text('输入不能为空');    
                 ev.preventDefault()
                 }else{
                     $.ajax({
                         methods:'get',
                         url:'/api/edit',
                         data:{
                             cid:targetid,
                             category:target,
                             valueChange:value
                         },
                         success:function(res){
                            if(res.code==1){
                                $(e.target).parent().prev().text(value)
                                $('.formedit').hide();
                            }
                             
                         },
                         error:function(res){
                             console.log(res)
                         }
                     })
                 }  
     
            })
        }
       })
   })


   $('.catagoryDelet').on('click',function(e){
        var targetidDelet=$(e.target).parent().prev().prev().text();
       $.get('/api/delet?cid='+targetidDelet,function(res){
           if(res.code==1){
            var targetDelet=$(e.target).parent().parent().hide()
           }
       })
   })

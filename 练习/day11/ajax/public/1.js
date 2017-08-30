$(".button button").click(function(){
  var username = $('[name=username]').val();
  var password = $('[name=password]').val();
  if ((!username) || (!password)){
    $('.login span:eq(0)').show();
  }else{
  $.ajax({
    method: 'post',
    url: '/login',
    data: {name:username,passwd:password},
    success: function(data, textStatus, jqXHR){
      console.log("recv from server: ",data);
      if (data == 'OK'){
        // $('.hello').append('<h1>登录成功</h1>');
        window.location = "https://www.jd.com/";
      }else{
        $('.login span:eq(1)').show();

      }
      // window.location = "https://www.jd.com/";
    }
  });}
});
$('input').focus(function(){
  $('.login span').hide();
});

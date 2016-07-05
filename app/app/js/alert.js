/**
 * Created by xupengli on 2015/11/25.
 */
$.ajax({
    url:'Accept.jsp',
    type:'post', //数据发送方式
    dataType:'json', //接受数据格式 (这里有很多,常用的有html,xml,js,json)
    data:'text='+$("#name").val()+'&date='+new Date(), //要传递的数据
    error: function(){ //失败
        alert('Error loading document');
    },
    success: function(msg){ //成功
        alert( "Data Saved: " + msg );
    }
});


//增加/减少数量
function count(btnobj){

};
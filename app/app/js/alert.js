/**
 * Created by xupengli on 2015/11/25.
 */
$.ajax({
    url:'Accept.jsp',
    type:'post', //���ݷ��ͷ�ʽ
    dataType:'json', //�������ݸ�ʽ (�����кܶ�,���õ���html,xml,js,json)
    data:'text='+$("#name").val()+'&date='+new Date(), //Ҫ���ݵ�����
    error: function(){ //ʧ��
        alert('Error loading document');
    },
    success: function(msg){ //�ɹ�
        alert( "Data Saved: " + msg );
    }
});


//����/��������
function count(btnobj){

};
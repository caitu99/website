var rollLoad = {
    totalRow:1, //最大条数
    idd:'',//最外层的ID
    totalheight:0,//容器的高度
    url:'',//数据访问URL
    start:0,//起始条
    curPage:1,
    param:{},
    init:function(obj,callevent){//传入默认值
        this.totalRow = obj.totalRow;
        this.idd= obj.idd;
        this.url=obj.url;
        this.start=Number(obj.start);
        this.param=obj.param;
        this.loading(callevent);
    },
    loading:function(callevent){ //触发滚动事件
        var thiz = this;
    	if(0 == thiz.start){//首次加载
        	thiz.addJsontext(5,callevent);
         }
        $(window).scroll(function(){  
        	var srollPos = $(window).scrollTop(); 
              //滚动条距顶部距离(页面超出窗口的高度)  
            thiz.totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
            if(($(document).height()) <= thiz.totalheight  && thiz.start < thiz.totalRow) { 
            		thiz.addJsontext(5,callevent);
            }  
        });
    },
    addJsontext:function(num,callevent){ 
    	var thiz = this;
        if(thiz.totalRow==0)return ;
        if(thiz.totalRow==thiz.start)return ;
        thiz.param.curPage=thiz.curPage;
        thiz.param.start=thiz.start;
        thiz.param.pageSize=num;
    	$.post(thiz.url,thiz.param,function(result){
    		if(0 == result.code){
    			var htmlStr = getAppendHtml(result.data);
		        thiz.start=thiz.start + num;
		        var main = $(thiz.idd); 
		        main.append(htmlStr);
		        thiz.curPage += 1;
		        if(callevent!=undefined){ callevent();}	
    		}else{
    			alert(result.message);
    		}
    	});
    }
}


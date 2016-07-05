/*
 * 层从下往上滑出
 * 使用方法：详见demo
 * */
;var touchSlide = (function($,window,undefined){
	var defaults = {
			id:"",	//事件触发对象
			slideId:'',	//滑出内容对象
			width:"50%",	//滑出层宽度
			height:"50%",	//滑出层高度
			extra:null,	//当滑出同时的额外回调
			ok:null,	//确定按钮
			cancel:null,	//取消按钮
			button:[]//,	//自定义按钮组
//			autoplay:false //自动播放
	};

	var winWidth = "100%",
		   winHeight = "100%",
		   bodyHeight = "100%",
		   scrollTop = 0;
	
	var template = ''
+'<div class="slidebox">'
+'	<table class="slidebox-outer">'
+'		<thead>'
+'			<tr>'
+'				<td class="slidebox-header">'
+'				<h3 class="slidebox-title"></h3>'
+'				<span class="slidebox-close">✕</span>'
+'				</td>'
+'			</tr>'
+'		</thead>'
+'		<tbody>'
+'			<tr>'
+'				<td class="slidebox-main"></td>'
+'			</tr>'
+'		</tbody>'
+'		<tfoot>'
+'			<tr>'
+'				<td class="slidebox-footer"></td>'
+'			</tr>'
+'		</tfoot>'
+'	</table>'
+'</div>';

	//未touchStart前，初始化页面元素
	function init(opts){
		if(!opts || !opts.id || !opts.slideId) return;
		$("#"+opts.slideId).hide();
	}
	
	//touch时创建层
	function addSlide(opts){
		$(template).appendTo($("body"));
		$(".slidebox-title").html(opts.title);
		$("#"+opts.slideId).show().appendTo($(".slidebox-main"));
	}
	
	//设置背景大小并添加到body中
	function addBackground(opts){
		winWidth = window.innerWidth;
	 	winHeight = window.innerHeight;
	 	bodyHeight = (bodyHeight = document.body.clientHeight) <= winHeight ? winHeight : document.body.clientHeight;
	 	scrollTop = $("body").scrollTop();
	 	$("<div class='slidebox-mask'></div>").css("height",bodyHeight).appendTo($("body")).animate({"opacity":1},300,"linear"); 
	}

	//添加按钮
	function addButton(opts){
		var btnstr = "";	//按钮字符串
		if((opts.button != 0) && (opts.ok !=null || opts.cancel != null)) return; //属性 button 和 ok、cancel 不能同时使用
		if(opts.ok !=null && opts.cancel !=null){
			opts.button = [{
				name:"确定"
			},{
				name:"取消"
			}];
		}else if(opts.ok !=null && opts.cancel ==null){
			opts.button = [{
				name:"确定"
			}];
		}else if(opts.ok ==null && opts.cancel !=null){
			opts.button = [{
				name:"取消"
			}];
		}
		
		for(var i = 0, len =  opts.button.length; i < len; i++){
			btnstr += '<a href="javascript:void(0)">'+opts.button[i].name+'</a>';
		}
		
		$(".slidebox-footer").html(btnstr);
		
		$(".slidebox-footer").find("a").each(function(){
			$(this).css({
				color:opts.button[$(this).index()].color,
				border:opts.button[$(this).index()].border,
				background:opts.button[$(this).index()].background
			}).click(function(){
				if(typeof opts.ok === "function" && $(this).html() === "确定"){
					var bool = opts.ok();
					if(bool) close(opts);
				}
				if(typeof opts.ok === "function" && $(this).html() === "取消"){
					var bool = opts.cancel();
					if(bool) close(opts);
				}
				if(typeof opts.button[$(this).index()].callback === "function" && $(this).html() !== "确定" && $(this).html() !== "取消"){
					var bool = opts.button[$(this).index()].callback();
					if(bool) close(opts);
				}
			});
		});
		
		//右上角关闭按钮
		$(".slidebox-close").click(function(){
			close(opts);
		})
	}
	
	//下滑出
	function touchStartDown(opts){
		var clone = {};
		for(var key in defaults){
			clone[key] = defaults[key];
		}
		
		for(var key in opts){
			clone[key] = opts[key]; 
		}
		
		// 弹出滑出层的额外操作
		if(clone.extra != null) {
			clone.extra();
		} 
		
		addSlide(clone);
		addBackground(clone);
		addButton(clone);

		//内容效果
		$(".slidebox").css({
			"display":"block",
 			"width":(parseInt(clone.width)/100 * winWidth) || "auto",
 			"height":(parseInt(clone.height)/100 * winHeight) || "auto",
 			"bottom":-winHeight-scrollTop
 		}).animate({
 			"bottom":"0"
 		},300,"linear");
	}
	
	//自动滑出
	function autoPlay(opts){
		init(opts);
		touchStartDown(opts);
	}

	//关闭弹出层
	function close(opts){
		$(".slidebox").animate({
			"bottom":-winHeight-scrollTop
		},300,"linear",function(){
			$("#"+opts.slideId).hide().appendTo($("body"));
			$(this).remove();
		});
		
		$(".slidebox-mask").animate({
			"opacity":0
		},300,"linear",function(){
			$(this).remove();
		}); 
	}
	
	//兼容触屏与鼠标操作
	var support = (function () {
        var support = {
            touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
        };
        // Export object
        return support;
    })();

	var touchEvents = {
        start: support.touch ? 'touchstart' : 'click'
    }
	
	return {
		down:function(opts){//点击播放
			init(opts);
			document.getElementById(opts.id).addEventListener(touchEvents.start, function(){
				touchStartDown(opts);
			}, false);
		},
		autoPlay:function(){
			autoPlay();
		},
		close:close
	}
}(jQuery,window,undefined));
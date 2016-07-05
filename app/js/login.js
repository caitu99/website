
void function() {
	function format(template, json) {
		return template.replace(/#\{(.*?)\}/g, function(all, key) {
			return json && (key in json) ? json[key] : "";
		});
	}

	headerHtml = format(
			String(function(){
			  	/*!
			  	 */
			}).replace(/^[^\{]*\{\s*\/\*!?|\*\/[;|\s]*\}$/g, ''),
			{
				title: "�������ģ��",
				date: "2014-05-16"
			}
	);
}();
document.write(headerHtml);

/***
 * 用户登录操作
 */
var login = function(window){
	//全局变量
	// note new new Date("2020-12-23") 在ie下面报错，不支持这样的语法
	var params = [],
	phone = '',
	code = '',
	cookieName='access_token',
	expires = new Date( new Date().getTime()+6*24*60*60*1000 ),//过期时间10分钟
	clientId=4,
	clientSecret='11ba337cec7d4d95b3bdeb61d477574b',
	anonymousCookieName='access_anonymous_token',
	wechatCookieName='caitu99_openid',
	rememberCookieName='caitu99_remember',
	userDefaultImg='http://static.caitu99.com/apppage/picture/user/default.png',
	manageBankFirstCookieName='caitu99_manage_bank_first',//银行办卡首次进入cookie名
	wechatExpires = new Date( new Date().getTime()+1000*60*60*24*30*12*100 ),//过期时间100年
	debug = true;
	var options = {
		'cookieName' : cookieName, //cookie的名字
		'expires' : expires, //cookie失效的时间
		'clientId' : clientId,
		'clientSecret' : clientSecret,
		'wechatCookieName' : wechatCookieName,
		'wechatExpires':wechatExpires,
		'rememberCookieName':rememberCookieName,
		'anonymousCookieName':anonymousCookieName,
		'manageBankFirstCookieName':manageBankFirstCookieName,
		'userDefaultImg':userDefaultImg,
		'debug' : debug  //是否打印调试信息
	};
	//构造方法
	function params(phone){
		this.phone = phone;
	}
	//暴露给外部的接口方法
	return {
		inited : false,
		debug : options.debug,
		init: function(option){
			//判断用户是否禁用cookie
			if(!window.navigator.cookieEnabled){
				alert('您的浏览器不支持cookie无法进行登录！,请设置允许设置cookie。');
				return false;
			}
			//启用初始化内容
			this.inited = true;
			//设计参数
			if(option){
				extend(options,option);
			}
		},
		isLogin:function(callevent){
			//获取用户Cookie中的令牌
			var cookie = getCookie(options.cookieName);
			if(typeof cookie === 'undefined'){
				//令牌不存在逻辑
//				alert('用户未登陆');
				var hosturl = window.location.href;
				if(hosturl.indexOf("banding.html")==-1){
					var remember = getCookie(options.rememberCookieName);
					var openid = getCookie(options.wechatCookieName);
					//alert(openid);
					if(remember){
						_log('微信自动登录');
						//getWechatUserInfo('',openid,'微信用户',options.userDefaultImg,options.clientId,options.clientSecret,'remember',options.phone);
						rememberLogin(openid,options.clientId,options.clientSecret,'微信用户',userDefaultImg,3);
						if(callevent!=undefined){
							_log('调用回调方法');
							callevent();
						}
					}else{
						_log('非自动登录,跳转到登录页面');
						loginUrl(openid);
					}
				}
			}else{
				//Cookie 存在
				//每个item之间用&分开，item的属性之间用|分割
				var cookie = getCookie(options.cookieName);
				if(cookie){
					_log('从cookie中获取access_token:' + cookie);
//					alert(cookie);
					getUserBasicinfo(cookie);
					if(callevent!=undefined){
						_log('调用回调方法');
						callevent();
					}
					return cookie;
				};
			};
		},
		isAnonymousLogin:function(){
			//获取用户Cookie中的令牌
			var cookie = getCookie(options.cookieName);
			if(typeof cookie === 'undefined'){
				var remember = getCookie(options.rememberCookieName);
				var openid = getCookie(options.wechatCookieName);
				if(remember){
					if(typeof openid == 'undefined' || null == openid){
						return anydl();
					}else{
						rememberLogin(openid,options.clientId,options.clientSecret,'微信用户',userDefaultImg,3);
						window.localStorage.activities_source = 2;
					}
				}else{
					return anydl();
				}
			}else{
				var cookie = getCookie(options.cookieName);
				if(cookie){
					window.localStorage.activities_source = 2;
					_log('从cookie中获取access_token:' + cookie);
					return cookie;
				}
			}
		},
		sendSms: function(phone){//发送手机验证码
			options.phone = phone;
			if(isPhone(options.phone)){
				_log('开始发送验证码');
				getToken(options.phone,options.clientId,options.clientSecret);
			}else{
				alert('请输入正确的手机号!');
				return;
			}
		},
		login: function(phone,code,openid,type,headin){//验证码登录
			_log('开始登录');
//			if(type == 'update'){
//				_log('用户微信账号存在绑定手机');
//				getWechatUserInfo('',openid,'微信用户',options.userDefaultImg,options.clientId,options.clientSecret,'remember',options.phone);
//				updatePhone(options.phone,code);
//			}else{
				_log('用户手机账号存在绑定微信');
				options.phone = phone;
				loginCode(options.phone,code,options.clientId,options.clientSecret,openid,options.userDefaultImg,headin);
//			}
		},
		loginSalesman: function(phone,code){//验证码登录
			_log('开始登录');
			options.phone = phone;
			loginCodeSalesman(options.phone,code,options.clientId,options.clientSecret);
		},
		getCookie : function(cookieName){
			return getCookie(cookieName);
		},
		setCookie : function(cookieName,cookieValue,expires){
			setCookie(cookieName,cookieValue,{"expires":new Date( new Date().getTime()+expires )});
		},
		setWechatCookie : function(type,cookieValue){
			console.log("type=" + type);
			if(type=='access_token'){
				_log('设置access_token的cookie');
				setCookie(options.cookieName,cookieValue,{"expires":options.expires});
			}else if(type=='remember'){
				_log('设置微信自动登录的cookie');
				setCookie(options.rememberCookieName,cookieValue,{"expires":options.wechatExpires});
			}else if(type=='openid'){
				_log('设置微信openid的cookie');
				setCookie(options.wechatCookieName,cookieValue,{"expires":options.wechatExpires});
			}else if(type == 'access_anonymous_token'){
				_log('设置微信access_anonymous_token的cookie');
				setCookie(options.anonymousCookieName,cookieValue,{"expires":options.expires});
			}else if(type == 'manage_bank_first'){
				_log('设置manage_bank_first的cookie');
				setCookie(options.manageBankFirstCookieName,cookieValue,{"expires":options.wechatExpires});
			}else{
				alert('请指定正确的cookieName');
			}
		},
		getWechatCookie : function(type){
			_log("获取cookie值type:" + type);
			if(type=='access_token'){
				_log('获取access_token的cookie值');
				return getCookie(options.cookieName);
			}else if(type=='remember'){
				_log('获取微信自动登录的cookie值');
				return getCookie(options.rememberCookieName);
			}else if(type=='openid'){
				_log('获取微信openid的cookie值');
				return getCookie(options.wechatCookieName);
			}else if(type == 'access_anonymous_token'){
				_log('获取微信access_anonymous_token的cookie值');
				return getCookie(options.anonymousCookieName);
			}else if(type == 'manage_bank_first'){
				_log('获取manage_bank_first的cookie值');
				return getCookie(options.manageBankFirstCookieName);
			}else{
				alert('请指定正确的cookieName');
				return null;
			}
		},
		clearWechatCookie : function(type){
			if(type=='access_token'){
				_log('清除access_token的cookie');
				setCookie(options.cookieName,'',{"expires":new Date( new Date().getTime()+10*60*0 )});
			}else if(type=='remember'){
				_log('清除微信自动登录的cookie');
				setCookie(options.rememberCookieName,'',{"expires":new Date( new Date().getTime()+10*60*0 )});
			}else if(type=='openid'){
				_log('清除微信openid的cookie');
				setCookie(options.wechatCookieName,'',{"expires":new Date( new Date().getTime()+10*60*0 )});
			}else{
				alert('请指定正确的cookieName');
			}
		},
		anonymousLogin: function(){//匿名登录
			return postAnonymous(options.clientId,options.clientSecret);
		}

	};


	/**
	 * 设置cookie
	 * @name setCookie
	 * @example setCookie(name, value[, options])
	 * @params {string} name 需要设置Cookie的键名
	 * @params {string} value 需要设置Cookie的值
	 * @params {string} [path] cookie路径
	 * @params {Date} [expires] cookie过期时间
	 */
	function setCookie(name, value, options) {
		options = options || {};
		var expires = options.expires || null;
		var path = options.path || "/";
		var domain = options.domain || document.domain;
		var secure = options.secure || null;
		/**
		document.cookie = name + "=" + escape(value)
		+ ((expires) ? "; expires=" + expires.toGMTString() : "")
		+ "; path=" + path
		+ "; domain=" + domain ;
		+ ((secure) ? "; secure" : "");
		*/
		var str = name + "=" + encodeURIComponent(value)
		+ ((expires) ? "; expires=" + expires.toGMTString() : "")
		+ "; path=/";
		document.cookie = str;
	};

	/**
	 * 获取cookie的值
	 * @name getCookie
	 * @example getCookie(name)
	 * @param {string} name 需要获取Cookie的键名
	 * @return {string|null} 获取的Cookie值，获取不到时返回null
	 */
	function getCookie(name) {
		_log("当前url：" + window.location.href + "或" + getPathUrl());
		_log('获取cookie值:' + document.cookie);
		var arr = document.cookie.match(new RegExp("(^| )" + name
				+ "=([^;]*)(;|$)"));
		if (arr != null) {
			return decodeURIComponent(arr[2]);
		}
		return undefined;
	};
	
	function anydl(){
		_log('匿名登录');
		var anycookie = getCookie(options.anonymousCookieName);
		if(window.localStorage){
			window.localStorage.activities_source = 3;
		}
		if(typeof anycookie == 'undefined' || null == anycookie){
			return postAnonymous(options.clientId,options.clientSecret);
		}else{
			return anycookie;
		}
	}
	

	//***********************私有方法********************/
	function _saveCookie(){
		var i=0,l=items.length;
		if(l>0){
			var tItems = [];
			for(;i<l;i++){
				var item = items[i];
				tItems[i] = item.goodItemId + '|' +item.name + '|'
				+ item.unitPrice + '|' + item.quantity+ '|' + item.version
				+ '|' + item.colorValue+ '|' + item.sizeValue + '|' + item.picturePath
				+ '|' + item.shopNo+ '|' + item.shopName;
			};
			var str = tItems.join('&');
			setCookie(options.cartName, str, {expires:options.expires});
		}else{
			setCookie(options.cartName, '', {expires:options.expires});
		}

	};

	//获取token
	function getToken(phone,clientId,clientSecret){
		_log('获取临时token:{' + 'phone:' + phone + ",clientId:" + clientId + ",clientSecret:" + clientSecret + "}");

		$.ajax({ type: "POST",//请求方式，get或post
			url: GATEWAY_GETACCESSTOKEN_PATH,
			data: "client_id="+clientId+"&grant_type=client_credentials&client_secret="+clientSecret,
			dataType:'json',
			timeout : 3000,  //超时时间设置，单位毫秒
			error: function(XmlHttpRequest,textStatus,errorThrown){
//				alert(errorThrown);
				_log('获取临时access_token失败:' + errorThrown);
				alert('系统繁忙,请稍后再试');
			},
			success: function(data){
//				console.log(data);
				var accessToken = data.access_token;
				if(accessToken!=null){
					_log('获取临时token成功,开始发送验证码:' + JSON.stringify(data));
					sendSms(phone,accessToken);
				}else{
					_log('获取临时access_token失败:' + JSON.stringify(data));
					alert('系统繁忙,请稍后再试');
				}
			},
	　　		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　		if(status=='timeout'){//超时,status还有success,error等值的情况
　 	 				//alert("请求超时，请稍后再试！");
	　　　　			operTimeout();
	　　　　		}
	　　		}
		});
	}
	//发送验证码
	function sendSms(phone,accessToken){
		_log('发送验证码:{' + 'phone:' + phone + ",accessToken:" + accessToken + "}");

		$.ajax({ type: "POST",//请求方式，get或post
			url: GATEWAY_SEND_PATH,
			data: "mobile=" + phone + "&access_token=" + accessToken,
			dataType:'json',
			timeout : 3000,  //超时时间设置，单位毫秒
			error: function(XmlHttpRequest,textStatus,errorThrown){
//				alert(errorThrown);
				_log('获取发送验证码失败:' + errorThrown);
				alert('系统繁忙,请稍后再试');
			},
			success: function(data){
//				console.log(data);
				var code = data.code;
				if(code==0){
					_log('发送验证码成功:' + JSON.stringify(data));
					alert('验证码发送成功,请注意查收!');
				}else{
					_log('获取发送验证码失败:' + JSON.stringify(data));
					alert('系统繁忙,请稍后再试');
				}
			},
	　　		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　		if(status=='timeout'){//超时,status还有success,error等值的情况
　 	 				//alert("请求超时，请稍后再试！");
	　　　　			operTimeout();
	　　　　		}
	　　		}
		});
	}
	//登录
	function loginCode(phone,phoneCode,clientId,clientSecret,openid,userDefaultImg,headin){
		_log('手机登录:{' + 'phone:' + phone + ",phoneCode:" + phoneCode + ",clientId:" + clientId + ",clientSecret:" + clientSecret+ "}");

		$.ajax({ type: "POST",//请求方式，get或post
			url: GATEWAY_LOGIN_PATH,
			async: false,
			data: "client_id="+clientId+"&grant_type=password&client_secret="+clientSecret+"&mobile="+phone+"&vcode="+phoneCode+"&type=0",
			dataType:'json',
			timeout : 3000,  //超时时间设置，单位毫秒
			error: function(XmlHttpRequest,textStatus,errorThrown){
//				alert(errorThrown);
				_log('登录失败:' + errorThrown);
				alert('系统繁忙,请稍后再试');
			},
			success: function(data){
				var accessToken = data.access_token;
				if(accessToken==null){
					_log('登录失败:' + JSON.stringify(data));
					alert('系统繁忙,请稍后再试');
					return;
				}

				if(openid==null || openid=='undefined' || openid==''){
					_log('非微信登录,直接跳转到首页');
					_log('登录成功,将access_token放入cookie中');
					login.setWechatCookie("access_token",accessToken);
					loginSkipUrl(headin);
				}else{
					_log('微信登录,获取微信用户信息');
					//获取微信用户信息
//					getWechatUserInfo(accessToken,openid,phone,userDefaultImg,clientId,clientSecret,'binding',phone);
					//绑定用户
					bindingUser(accessToken,openid);
				}
			},
	　　		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　		if(status=='timeout'){//超时,status还有success,error等值的情况
　 	 				//alert("请求超时，请稍后再试！");
	　　　　			operTimeout();
	　　　　		}
	　　		}
		});
	}

	//地推业务员登录
	function loginCodeSalesman(phone,phoneCode,clientId,clientSecret){
		_log('地推业务员登录:{' + 'phone:' + phone + ",phoneCode:" + phoneCode + ",clientId:" + clientId + ",clientSecret:" + clientSecret+ "}");

		$.ajax({ type: "POST",//请求方式，get或post
			url: GATEWAY_LOGIN_PATH,
			async: false,
			data: "client_id="+clientId+"&grant_type=password&client_secret="+clientSecret+"&mobile="+phone+"&vcode="+phoneCode+"&type=0",
			dataType:'json',
			timeout : 3000,  //超时时间设置，单位毫秒
			error: function(XmlHttpRequest,textStatus,errorThrown){
//				alert(errorThrown);
				_log('登录失败:' + errorThrown);
				alert('系统繁忙,请稍后再试');
			},
			success: function(data){
				var accessToken = data.access_token;
				if(accessToken==null){
					_log('登录失败:' + JSON.stringify(data));
					alert('系统繁忙,请稍后再试');
					return;
				}

				login.setWechatCookie("access_token",accessToken);

				$.ajax({
					type: "POST",//请求方式，get或post
					url: SALESMANLOGIN_PATH,
					data: "access_token=" + accessToken + "&phone=" + phone ,
					dataType: 'json',
					timeout: 15000,  //超时时间设置，单位毫秒
					error: function (XmlHttpRequest, textStatus, errorThrown) {
						alert('系统繁忙,请稍后再试');
					},
					success: function (data) {
						if (0 == data.code) {
							window.location.href = LOCAL_PATH + "/clerk_background/salesman_data.html?stall="+data.data.stall;
						} else {
							alert(data.message);
						}
					}
				});

			},
			complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
				if(status=='timeout'){//超时,status还有success,error等值的情况
					//alert("请求超时，请稍后再试！");
					operTimeout();
				}
			}
		});
	}

	//绑定用户
	function bindingUser(accessToken,openid){
		_log('绑定用户:{' + 'accessToken:' + accessToken + ",openid:" + openid + "}");

		$.ajax({ type: "POST",//请求方式，get或post
			url: THIRD_BIND_PATH,
			data: "access_token="+accessToken+"&uid="+openid+"&type=3",
			dataType:'json',
			timeout : 3000,  //超时时间设置，单位毫秒
			error: function(XmlHttpRequest,textStatus,errorThrown){
//				alert(errorThrown);
				_log('绑定用户失败:' + errorThrown);
				alert('系统繁忙,请稍后再试');
			},
			success: function(data){
				var code = data.code;

				if(code==0){
					_log('绑定用户成功');
					_log('登录成功,将access_token放入cookie中');
					login.setWechatCookie("access_token",accessToken);
					_log('设置微信自动登录属性');
					login.setWechatCookie("remember","true");
					alert('绑定成功',function(){
						_log('跳转到首页');
						loginSkipUrl();
						return;
					});
				}else if(code==2804){
					_log('该手机号码已绑定过此openid,直接登录');
					_log('登录成功,将access_token放入cookie中');
					login.setWechatCookie("access_token",accessToken);
					_log('设置微信自动登录属性');
					login.setWechatCookie("remember","true");
					_log('跳转到首页');
					loginSkipUrl();
				}else{
					_log('绑定用户失败:' + JSON.stringify(data));
					alert(data.message);
				}
			},
	　　		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　		if(status=='timeout'){//超时,status还有success,error等值的情况
　 	 				//alert("请求超时，请稍后再试！");
	　　　　			operTimeout();
	　　　　		}
	　　		}
		});
	}


	//匿名登录
	function postAnonymous(clientId,clientSecret){
		var accessToken = null;
		$.ajax({ type: "POST",//请求方式，get或post
			url: GATEWAY_LOGIN_PATH,
			async: false,
			data: "client_id="+clientId+"&grant_type=client_credentials&client_secret="+clientSecret,
			dataType:'json',
			timeout : 3000,  //超时时间设置，单位毫秒
			error: function(XmlHttpRequest,textStatus,errorThrown){
//				alert(errorThrown);
				_log('匿名登录失败:' + errorThrown);
				alert('系统繁忙,请稍后再试');
			},
			success: function(data){
				accessToken = data.access_token;
				if(accessToken==null){
					_log('匿名登录失败:' + data);
					alert('系统繁忙,请稍后再试');
				}
				_log('匿名登录成功,将access_anonymous_token放入cookie中');
				login.setWechatCookie(options.anonymousCookieName,accessToken);
			},
	　　		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　		if(status=='timeout'){//超时,status还有success,error等值的情况
　 	 				//alert("请求超时，请稍后再试！");
	　　　　			operTimeout();
	　　　　		}
	　　		}
		});
		
		return accessToken;
	}



	//获取微信用户信息
	function getWechatUserInfo(accessToken,openid,nickname,headimgurl,clientId,clientSecret,type,phone){
		_log('获取微信用户信息:{' + 'accessToken:' + accessToken + ",openid:" + openid + ",clientId:" + clientId +
							",clientSecret:" + clientSecret+ ",nickname" + nickname + ",headimgurl" + headimgurl +
							",type" + type + ",phone:" + phone + "}");

		$.ajax({ type: "POST",//请求方式，get或post
			url: GET_WECHAT_USER_INFO_PATH,
			async: false,
			data: "openid="+openid,
			dataType:'json',
			timeout : 3000,  //超时时间设置，单位毫秒
			error: function(XmlHttpRequest,textStatus,errorThrown){
//				alert(errorThrown);
				_log('获取微信用户信息失败:' + errorThrown);
				//alert('系统繁忙,请稍后再试');
				if(type=='binding'){
					_log('开始绑定微信');
					openidBinging(accessToken,openid,nickname,headimgurl,3,phone);
				}else if(type=='remember'){
					_log('开始自动登录微信');
					rememberLogin(openid,clientId,clientSecret,nickname,headimgurl);
				}else{
					alert("参数指定错误");
				}
			},
			success: function(data){
				if(data.code == 0){
					var result = data.data;
					//绑定微信
					_log('获取微信用户信息成功:' + JSON.stringify(data));
					if(type=='binding'){
						_log('开始绑定微信');
						openidBinging(accessToken,openid,result.nickname,result.headimgurl,3,phone);
					}else if(type=='remember'){
						_log('开始自动登录微信');
						rememberLogin(openid,clientId,clientSecret,result.nickname,result.headimgurl);
					}else{
						alert("参数指定错误");
					}
				}else{
					//绑定微信
					_log('获取微信用户信息失败:' + JSON.stringify(data));
					if(type=='binding'){
						_log('开始绑定微信');
						openidBinging(accessToken,openid,nickname,headimgurl,3,phone);
					}else if(type=='remember'){
						_log('开始自动登录微信');
						rememberLogin(openid,clientId,clientSecret,nickname,headimgurl);
					}else{
						alert("参数指定错误");
					}
				}
			},
	　　		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　		if(status=='timeout'){//超时,status还有success,error等值的情况
　 	 				//alert("请求超时，请稍后再试！");
	　　　　			operTimeout();
	　　　　		}
	　　		}
		});
	}

	//绑定openid
	function openidBinging(accessToken,openid,nickname,imgurl,type,phone){
		_log('绑定微信用户:{' + 'accessToken:' + accessToken + ",openid:" + openid + ",nickname" + nickname + ",imgurl" + imgurl +
							",type" + type + ",phone:" + phone + "}");

		$.ajax({ type: "POST",//请求方式，get或post
			url: THIRD_BIND_PATH,
			data: "access_token="+accessToken+"&uid="+openid+"&nickname="+nickname+"&imgurl="+imgurl+"&type="+type+"&phone="+phone,
			dataType:'json',
			timeout : 3000,  //超时时间设置，单位毫秒
			error: function(XmlHttpRequest,textStatus,errorThrown){
//				alert(errorThrown);
				_log('绑定微信失败:' + errorThrown);
				alert('系统繁忙,请稍后再试');
			},
			success: function(data){
				var code = data.code;
				if(code == 0){
					_log('登录成功,将access_token放入cookie中:' + JSON.stringify(data));
					login.setWechatCookie("access_token",accessToken);
					_log('绑定成功');
					_log('设置微信自动登录属性');
					login.setWechatCookie("remember","true");
					alert("绑定成功",function(){
						loginSkipUrl();
					});
				}else if(code==2804 || code==2805){
					_log('登录成功,将access_token放入cookie中:' + JSON.stringify(data));
					login.setWechatCookie("access_token",accessToken);
					_log('该微信用户已经绑定过此手机,直接登录');
					_log('设置微信自动登录属性');
					login.setWechatCookie("remember","true");
					loginSkipUrl();
				}else{
					_log('绑定微信失败:' + JSON.stringify(data));
					alert(data.message);
				}
			},
	　　		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　		if(status=='timeout'){//超时,status还有success,error等值的情况
　 	 				//alert("请求超时，请稍后再试！");
	　　　　			operTimeout();
	　　　　		}
	　　		}
		});
	}

	//获取用户信息
	function getUserBasicinfo(accessToken){
		_log('验证access_token:{' + 'accessToken:' + accessToken + "}");

		$.ajax({ type: "POST",//请求方式，get或post
			url: USER_BASICINFO_PATH,
			async: false,
			data: "access_token="+accessToken,
			dataType:'json',
			timeout : 3000,  //超时时间设置，单位毫秒
			error: function(XmlHttpRequest,textStatus,errorThrown){
//				alert(errorThrown);
				_log('验证access_token失败:' + errorThrown);
				alert('系统繁忙,请稍后再试',function(){
					_log('跳转到登录页面');
					loginUrl(login.getWechatCookie('openid'));
				});
			},
			success: function(data){
				var code = data.code;
				if(code == 0){
					_log('验证access_token成功,access_token未失效');
					return true;
				}else{
					_log('验证access_token成功,access_token已失效:' + JSON.stringify(data));
//					alert('登录超时,请重新登录');
					_log('清除cookie中的access_token值');
					login.clearWechatCookie("access_token");
					_log('跳转到登录页面');
					loginUrl();
				}
			},
	　　		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　		if(status=='timeout'){//超时,status还有success,error等值的情况
　 	 				//alert("请求超时，请稍后再试！");
	　　　　			operTimeout();
	　　　　		}
	　　		}
		});

		return false;
	}

	//判断是否是手机号
	function isPhone(phone){
		var reg = /^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$/;
		if (reg.test(phone)) {
			return true;
		}else{
			return false;
		};
	}

	//***********************工具方法********************/

	//继承属性
	function extend(destination, source) {
		for ( var property in source) {
			destination[property] = source[property];
		}
	};

	//自动登录
	function rememberLogin(openid,clientId,clientSecret,nickname,imgurl){
		_log('微信用户自动登录:{' + "openid:" + openid + ",nickname:" + nickname + ",imgurl:" + imgurl +
				",clientId:" + clientId + ",clientSecret:" + clientSecret + "}");

		$.ajax({ type: "POST",//请求方式，get或post
			url: GATEWAY_LOGIN_PATH,
			async: false,
			data: "grant_type=password&client_secret="+clientSecret+"&uid="+openid+"&nickname="+nickname+
					"&profileimg="+imgurl+"&type=5&client_id="+clientId,
			dataType:'json',
			timeout : 3000,  //超时时间设置，单位毫秒
			error: function(XmlHttpRequest,textStatus,errorThrown){
				_log('微信自动登录失败:' + errorThrown);
				alert('系统繁忙,请稍后再试',function(){
					_log('跳转到登录页面');
					loginUrl(login.getWechatCookie('openid'));
				});
			},
			success: function(data){
				var accessToken = data.access_token;
				if(accessToken != null){
					_log('微信自动登录成功,将access_token放入cookie中 :' + accessToken);
					login.setWechatCookie("access_token",accessToken);
					_log('微信自动登录成功,微信自动登录为true');
					login.setWechatCookie("remember","true");
				}else if(data.error == '5132'){
					_log('微信自动登录失败:' + JSON.stringify(data));
					alert('您还未绑定,请先绑定',function(){
						_log('跳转到登录页面');
						loginUrl(login.getWechatCookie('openid'));
					});
				}else{
					_log('微信自动登录失败:' + JSON.stringify(data));
					alert('系统繁忙,请稍后再试',function(){
						_log('跳转到登录页面');
						loginUrl(login.getWechatCookie('openid'));
					});
//					alert(data.error_description);
				}
			},
	　　		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　		if(status=='timeout'){//超时,status还有success,error等值的情况
　 	 				//alert("请求超时，请稍后再试！");
	　　　　			operTimeout();
	　　　　		}
	　　		}
		});
	}
	
	
	
	//匿名用户微信自动登录
	function anyrememberLogin(openid,clientId,clientSecret,nickname,imgurl){
		_log('微信用户自动登录:{' + "openid:" + openid + ",nickname:" + nickname + ",imgurl:" + imgurl +
				",clientId:" + clientId + ",clientSecret:" + clientSecret + "}");
		$.ajax({ type: "POST",//请求方式，get或post
			url: GATEWAY_LOGIN_PATH,
			async: false,
			data: "grant_type=password&client_secret="+clientSecret+"&uid="+openid+"&nickname="+nickname+
					"&profileimg="+imgurl+"&type=5&client_id="+clientId,
			dataType:'json',
			timeout : 3000,  //超时时间设置，单位毫秒
			error: function(XmlHttpRequest,textStatus,errorThrown){
				_log('微信自动登录失败:' + errorThrown);
				alert('系统繁忙,请稍后再试',function(){
					_log('跳转到登录页面');
					loginUrl(login.getWechatCookie('openid'));
				});
			},
			success: function(data){
				var accessToken = data.access_token;
				if(accessToken != null){
					login.setWechatCookie("access_token",accessToken);
					login.setWechatCookie("remember","true");
				}
				return accessToken;
			},
	　　		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　		if(status=='timeout'){//超时,status还有success,error等值的情况
	　　　　			operTimeout();
	　　　　		}
	　　		}
		});
	}
	

	//绑定手机号
	function updatePhone(phone,code){
		var accessToken = login.getWechatCookie("access_token");

		$.ajax({ type: "POST",//请求方式，get或post
			url: WECHAT_BING_MOBILE,
			async: false,
			data: "access_token=" + accessToken + "&mobile=" + phone + "&vcode=" + code,
			dataType:'json',
			timeout : 3000,  //超时时间设置，单位毫秒
			error: function(XmlHttpRequest,textStatus,errorThrown){
				_log('绑定手机失败:' + errorThrown);
				alert('系统繁忙,请稍后再试');
			},
			success: function(data){
				var code = data.code;
				if(code == 0){
					_log('绑定手机成功' + JSON.stringify(data));
					_log('绑定手机成功,微信自动登录为true');
					login.setWechatCookie("remember","true");
					_log('跳转到首页');
					alert('绑定成功',function(){
						loginSkipUrl();
					});
				}else{
					_log('绑定手机失败:' + JSON.stringify(data));
					alert('系统繁忙,请稍后再试');
				}
			},
	　　		complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　		if(status=='timeout'){//超时,status还有success,error等值的情况
　 	 				//alert("请求超时，请稍后再试！");
	　　　　			operTimeout();
	　　　　		}
	　　		}
		});
	}
}(typeof window === 'undifined' ? this: window);

//显示调试信息
function _log(info){
	if(typeof console != 'undefined' && login.debug){
		console.log(info);
	}
}

//显示调试信息
function _err(info){
	if(typeof console != 'undefined' && login.debug){
		console.error(info);
	}
}

//获取url路径
function getPathUrl(){
	return window.location.protocol + "//" + window.location.host;
}

//判断是否是手机号
function isPhone(phone){
	var reg = /^1([38]\d|4[57]|5[0-9]|7[06-8]|8[89])\d{8}$/;
	if (reg.test(phone)) {
		return true;
	}else{
		return false;
	};
}

//获取url参数设置
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) {
		return (r[2]);
	}
	return null;
}

//获取url参数设置(获取完整的url地址包括&)
function getQueryString2(name) {
	var reg = new RegExp("(^|&)" + name + "=([^]*)(&|$)","i");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) {
		return (r[2]);
	}
	return null;
}

//获取url参数设置
function getQueryStringURL(str,name) {
	var num = str.indexOf("?") 
	str = str.substr(num+1);
	var arr = str.split("&");
	for(var i=0;i<arr.length;i++){ 
		num=arr[i].indexOf("="); 
	    if(num>0){ 
	    	var key = arr[i].substring(0,num);
	    	var value = arr[i].substr(num+1);
	    	if(key == name){
	    		return value;
	    	}
	    } 
    } 
	return null;
}

function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if(url.indexOf("?") != -1){
		var str = url.substr(1);
		strs = str.split("&");
		for(var i=0;i<strs.length;i++) {
			theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

//获取上一页
function getBackUrl(){
	var url = window.history.back(-1);
	if(url=='undefined'||url==null||url==''){
		return null;
	}
	return url;
}


//登录成功后跳转页面
function loginSkipUrl(headin){
	if(headin == 'mengbao'){
		$('.prize').show();
		$('.boomon').show();
		return ;
	}
	var gotourl = getQueryString2("redirect");
	if(null==gotourl || ''==gotourl || 'undefined'==gotourl){
		var last = document.referrer;
		_log(last);
		if(last!=null && last!='' && last!='undefined'){
			window.location.href = last;
		}else{
			window.location.href = LOCAL_PATH + "/Integral_page/Financial.html";
		}
	}else{
		window.location.href = gotourl;
	}
}

//登录页面
function loginUrl(openid){
	var redirect = window.location.href;
	if(openid!=null && openid!='' && openid!='undefined'){
		window.location.href = LOCAL_PATH + "/Integral_page/banding.html?openid="+openid+"&redirect="+redirect;
	}else{
		window.location.href = LOCAL_PATH + "/Integral_page/banding.html?redirect="+redirect;
	}
}

//判断字符串是否为空
function isEmpty(value){
	if(value!=null && value!='' && value!='undefined'){
		return false;
	}
	return true;
}

//判断是否为数字
function isNumber(number){
	var reg = /^[0-9A-Z]+$/;
	return  reg.test(number);
}

//统一状态码操作
function operStatusCode(code,message){
	_log('统一状态码操作:{' + code + ":" + message + "}");
	if(code == 5120){
		alert(message);
	}else if(code == 5109){
		loginUrl();
	}else if(code == 5113){
		alert(message);
	}else if(code.toString().substring(0,1) == '5'){
		alert('当前网络繁忙,请稍后再试',function(){
			operTimeout();
		});
	}else{
		alert(message);
	}
}

//超时处理
function operTimeout(){
	window.location.href = LOCAL_PATH + "/network/network.html";
}

$(document).ready(function() {
	login.init({
		'phone':''
	});

	var openid = login.getWechatCookie("openid");
	if(openid==null || openid=='' || openid=='undefined'){
		openid = getQueryString("openid");
		if(openid!=null && openid!='' && openid!='undefined'){
			login.setWechatCookie("openid",openid);
		}
	}

	var remember = getQueryString("remember");
	if(remember!=null && remember!='' && remember!='undefined'){
		login.setWechatCookie("remember",remember);
	}

});


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

//请求域名
//var LOCAL_PATH = "http://127.0.0.1:8080/service";//product
var LOCAL_PATH = "";


//活动微信分享
var ACTIVITIES_SHARE_PATH = LOCAL_PATH + "/public/wechat/activity/share/1.0";

//验证用户抽奖次数
//var ACTIVITIES_CHECKTIMES_PATH = LOCAL_PATH + "/api/activities/cards/checkTimes/1.0";
var ACTIVITIES_CHECKTIMES_PATH = LOCAL_PATH + "/gw/oauthentry/activities.cards/1.0/checkTimes";

//验证用户财币是否足够
//var ACTIVITIES_CHECKACCOUNT_PATH = LOCAL_PATH + "/api/activities/cards/checkAccount/1.0";
var ACTIVITIES_CHECKACCOUNT_PATH = LOCAL_PATH + "/gw/oauthentry/activities.cards/1.0/checkAccount";

//抽奖
//var ACTIVITIES_WINNING_PATH = LOCAL_PATH + "/api/activities/cards/winning/1.0";
var ACTIVITIES_WINNING_PATH = LOCAL_PATH + "/gw/oauthentry/activities.cards/1.0/winning";

//获取抽奖记录
//var ACTIVITIES_GETINRECORD_PATH = LOCAL_PATH + "/api/activities/cards/getInRecord/1.0";
var ACTIVITIES_GETINRECORD_PATH = LOCAL_PATH + "/gw/oauthentry/activities.cards/1.0/getInRecord";

//获取奖品信息
//var ACTIVITIES_GETACTIVITIESITEM_PATH = LOCAL_PATH + "/api/activities/cards/getActivitiesItem/1.0";
var ACTIVITIES_GETACTIVITIESITEM_PATH = LOCAL_PATH + "/gw/oauthentry/activities.cards/1.0/getActivitiesItem";

//未认证用户抽奖
//var ACTIVITIES_NOUSERWINNING_PATH = LOCAL_PATH + "/api/activities/cards/unautherized/winning/1.0";
var ACTIVITIES_NOUSERWINNING_PATH = LOCAL_PATH + "/gw/oauthentry/activities.cards.unautherized/1.0/winning";

//未认证用户领奖
//var ACTIVITIES_NOUSERGETWINNING_PATH = LOCAL_PATH + "/api/activities/cards/unautherized/awardItm/1.0";
var ACTIVITIES_NOUSERGETWINNING_PATH = LOCAL_PATH + "/gw/oauthentry/activities.cards.unautherized/1.0/awardItm";

//领奖
//var ACTIVITIES_AWARDITEM_PATH = LOCAL_PATH + "/api/activities/cards/awardItm/1.0";
var ACTIVITIES_AWARDITEM_PATH = LOCAL_PATH + "/gw/oauthentry/activities.cards/1.0/awardItm";

//放弃抽奖
//var ACTIVITIES_GIVEUP_PATH = LOCAL_PATH + "/api/activities/cards/giveup/1.0";
var ACTIVITIES_GIVEUP_PATH = LOCAL_PATH + "/gw/oauthentry/activities.cards/1.0/giveup";

//商品详情
//var GOODSDETAIL_PATH = LOCAL_PATH + "/api/goods/item/getGoodsDetail/1.0";
var GOODSDETAIL_PATH = LOCAL_PATH + "/gw/oauthentry/goods.item/2.0/detail";
//var GOODSDETAIL_PATH = LOCAL_PATH + "/api/goods/item/goodsDetail/2.0";



//商品订单
var GOODSORDER_PATH = LOCAL_PATH + "/gw/oauthentry/transaction.order/1.0/generate";
//var GOODSORDER_PATH = LOCAL_PATH + "/api/transaction/order/generate/1.0";


//var ORDERLIST_PATH = LOCAL_PATH + "/api/transaction/order/list/1.0";
var ORDERLIST_PATH = LOCAL_PATH + "/gw/oauthentry/transaction.order/1.0/list";

//var ORDERDEL_PATH = LOCAL_PATH + "/api/transaction/order/del/1.0";
var ORDERDEL_PATH = LOCAL_PATH + "/gw/oauthentry/transaction.order/1.0/del";



//网关 通过client_credentials模式获取access token
var GATEWAY_GETACCESSTOKEN_PATH = LOCAL_PATH + "/oauth/token";

//网关 发送验证码
var GATEWAY_SEND_PATH = LOCAL_PATH + "/gw/oauthentry/sms/1.0/send";

//网关 登录
var GATEWAY_LOGIN_PATH = LOCAL_PATH + "/oauth/token";

//查询用户信息
var QUERY_USER_INTEGRAL_PATH = LOCAL_PATH + "/gw/oauthentry/user.card.integral/1.0/query";


//我的礼券/api/customer/coupon
var QUERY_MY_COUPON_PATH = LOCAL_PATH + "/gw/oauthentry/goods.customer.coupon.my/1.0/list";
//var QUERY_MY_COUPON_PATH = LOCAL_PATH + "/api/customer/coupon/my/list/1.0";

//我的历史礼券/api/customer/coupon
var QUERY_HISTORY_COUPON_PATH = LOCAL_PATH + "/gw/oauthentry/goods.customer.coupon.history/1.0/list";
//var QUERY_HISTORY_COUPON_PATH = LOCAL_PATH + "/api/customer/coupon/history/list/1.0";


//订单中的兑换券
var QUERY_ORDER_COUPON_PATH = LOCAL_PATH + "/gw/oauthentry/goods.customer.coupon.order/1.0/list";

var SHOP_MESSAGE_PATH = LOCAL_PATH+"/gw/oauthentry/goods.areastore/1.0/list";

//获取微信用户信息
var GET_WECHAT_USER_INFO_PATH = LOCAL_PATH + "/public/wechat/userInfo/1.0";

//第三方绑定(微信绑定)
var THIRD_BIND_PATH = LOCAL_PATH + "/gw/oauthentry/user.third/2.1/bind";

//获取用户基本信息
var USER_BASICINFO_PATH = LOCAL_PATH + "/gw/oauthentry/user.account/1.0/basicinfo";
//获取用户收货地址
var USER_ADDRESS_PATH = LOCAL_PATH + "/gw/oauthentry/user.address/1.0/get";
//var USER_ADDRESS_PATH = LOCAL_PATH + "/api/user/address/get/1.0";
//更新用户收货地址
var USER_ADDRESS_UPDATE_PATH = LOCAL_PATH + "/gw/oauthentry/user.address/1.0/update";
//var USER_ADDRESS_UPDATE_PATH = LOCAL_PATH + "/api/user/address/update/1.0";

//商品列表
var GOODSLIST_PATH = LOCAL_PATH + "/gw/oauthentry/goods.item/1.0/list";
//var GOODSLIST_PATH = LOCAL_PATH + "/api/goods/item/list/1.0";

//验证用户是否设置支付密码
var CHECK_USER_PAYPASS_EXISTS_PATH = LOCAL_PATH + "/gw/oauthentry/user.paypass/1.0/exist";

//根据订单好查询订单详情，用于订单列表支付显示
var GET_ORDER_DETAIL_BY_ORDER_NO_PATH = LOCAL_PATH + "/gw/oauthentry/transaction.order/1.0/detail";

//支付
var TO_PAY_PATH = LOCAL_PATH + "/gw/oauthentry/transaction.pay/1.0/shop";

var TO_SPECIAL_PAY_PATH = LOCAL_PATH + "/gw/oauthentry/transaction.order.special/1.0/generate";
//var TO_SPECIAL_PAY_PATH = LOCAL_PATH + "/api/transaction/order/special/generate/1.0";

var COUPON_RECEIVE_PATH = LOCAL_PATH + "/gw/oauthentry/transaction.coupon/1.0/receive";

//绑定手机
var WECHAT_BING_MOBILE = LOCAL_PATH + "/gw/oauthentry/user.mobile/1.0/update";

//查询在线办理银行列表
var ONLINE_MANAGE_BANK_LIST = LOCAL_PATH + "/gw/oauthentry/manage.bank.online/1.0/list";
//查询上门办理银行列表
var DROPIN_MANAGE_BANK_LIST = LOCAL_PATH + "/gw/oauthentry/manage.bank.dropIn/1.0/list";
//根据id查询银行
var SELECT_BY_PRIMARYKEY_BANK = LOCAL_PATH + "/gw/oauthentry/manage.bank.select/1.0/primaryKey";
//获取用户认证信息
var USER_JUDGE_AUTHOR = LOCAL_PATH + "/gw/oauthentry/user.judge/1.0/author";
//保存在线办理数据
var SAVE_ONLINE_MANAGE_BANK = LOCAL_PATH + "/gw/oauthentry/manage.bank.save/1.0/online";
//保存上门办理数据
var SAVE_DROPIN_MANAGE_BANK = LOCAL_PATH + "/gw/oauthentry/manage.bank.save/1.0/dropIn";
//查询我的预约列表
var RESERVATION_BANK_LIST = LOCAL_PATH + "/gw/oauthentry/manage.bank.reservation/1.0/list";


//第三方平台注册
var OTHER_PLATFORM_REGISTER = LOCAL_PATH + "/gw/oauthentry/activities.other.platform/1.0/register";

//查询商品列表
var CLASSIFICATION_TYPE_LIST = LOCAL_PATH + "/gw/oauthentry/goods.classification.type/1.0/list";

//轮播图分页
var BANNER_LIST = LOCAL_PATH + "/gw/oauthentry/sys.banner/1.0/list";

//刷卡活动统计记录
var ACTIVITY_CARD_STATISTICS = LOCAL_PATH + "/public/activities/statistics/card/1.0";

//验证用户是否可下单
var VALIDATE_PATH = LOCAL_PATH + "/gw/oauthentry/ishop.cm/1.0/validate";

//发送身份认证短信
var SEND_AUTH_SMS = LOCAL_PATH + "/gw/oauthentry/user.sms/1.0/sendauth";

//身份认证
var USER_AUTH = LOCAL_PATH + "/gw/oauthentry/user.user/1.0/auth";

//根据银行卡号获取银行信息
var GET_BANK_INFO = LOCAL_PATH + "/gw/oauthentry/user.bank.info/1.0/get";

//登录初始化
var INIT_PATH = LOCAL_PATH +"/gw/oauthentry/ishop.unicom/1.0/init";
//var INIT_PATH = LOCAL_PATH +"/api/ishop/unicom/init/1.0";

//抽签活动统计记录
var ACTIVITY_CHOUQIAN_STATISTICS = LOCAL_PATH + "/public/activities/statistics/chouqian/1.0";

//建行积分商城发送验证码
var CCB_REGISTER_SEND = LOCAL_PATH + "/gw/oauthentry/ishop.ccb.register/1.0/send";
//var CCB_REGISTER_SEND = LOCAL_PATH + "/api/ishop/ccb/register/send/1.0";
//建行积分商城注册
var CCB_REGISTER_SUBMIT = LOCAL_PATH + "/gw/oauthentry/ishop.ccb.register/1.0/submit";
//var CCB_REGISTER_SUBMIT = LOCAL_PATH + "/api/ishop/ccb/register/submit/1.0";
//建行积分商城自动填写登录信息
var CCB_AUTO_ACCOUNT = LOCAL_PATH + "/gw/oauthentry/ishop.ccb.auto/1.0/account";
//var CCB_AUTO_ACCOUNT = LOCAL_PATH + "/api/ishop/ccb/auto/account/1.0";
//建行积分商城登录
var CCB_USER_LOGIN = LOCAL_PATH + "/gw/oauthentry/ishop.ccb.login/1.0/submit";
//var CCB_USER_LOGIN = LOCAL_PATH + "/api/ishop/ccb/login/submit/1.0";
//建行积分商城登录图片验证码
var CCB_LOGIN_IMAGECODE = LOCAL_PATH + "/gw/oauthentry/ishop.ccb.login/1.0/imageCode";
//var CCB_LOGIN_IMAGECODE = LOCAL_PATH + "/api/ishop/ccb/login/imageCode/1.0";
//建行积分商城自动填写银行卡信息
var CCB_AUTO_BANKCARD = LOCAL_PATH + "/gw/oauthentry/ishop.ccb.auto/1.0/bankCard";
//var CCB_AUTO_BANKCARD = LOCAL_PATH + "/api/ishop/ccb/auto/bankCard/1.0";

//建行积分商城支付发送验证码
var CCB_PAY_SEND = LOCAL_PATH + "/gw/oauthentry/ishop.ccb.pay/1.0/send";
//var CCB_PAY_SEND = LOCAL_PATH + "/api/ishop/ccb/pay/send/1.0";
//建行积分商城支付
var CCB_PAY_SUBMIT = LOCAL_PATH + "/gw/oauthentry/ishop.ccb.pay/1.0/submit";
//var CCB_PAY_SUBMIT = LOCAL_PATH + "/api/ishop/ccb/pay/submit/1.0";


//天翼积分商城登录图片验证码
var ESURFING_LOGIN_IMAGECODE = LOCAL_PATH + "/gw/oauthentry/ishop.esurfing.login/1.0/imageCode";
//var ESURFING_LOGIN_IMAGECODE = LOCAL_PATH + "/api/ishop/esurfing/login/imageCode/1.0";
//天翼积分商城自动填写登录信息
var ESURFING_AUTO_ACCOUNT = LOCAL_PATH + "/gw/oauthentry/ishop.esurfing.auto/1.0/account";
//var ESURFING_AUTO_ACCOUNT = LOCAL_PATH + "/api/ishop/esurfing/auto/account/1.0";
//天翼积分商城登录
var ESURFING_USER_LOGIN = LOCAL_PATH + "/gw/oauthentry/ishop.esurfing.login/1.0/submit";
//var ESURFING_USER_LOGIN = LOCAL_PATH + "/api/ishop/esurfing/login/submit/1.0";
//天翼积分商城支付
var ESURFING_PAY_SUBMIT = LOCAL_PATH + "/gw/oauthentry/ishop.esurfing.pay/1.0/submit";
//var ESURFING_PAY_SUBMIT = LOCAL_PATH + "/api/ishop/esurfing/pay/submit/1.0";

//天翼积分商城生成订单,并发送验证码
//var ESURFING_PAY_ORDER = LOCAL_PATH + "/gw/oauthentry/ishop.esurfing.pay/1.0/order";
var ESURFING_PAY_ORDER = LOCAL_PATH + "/api/ishop/esurfing/pay/order/1.0";
//天翼积分商城发送支付验证码
//var ESURFING_PAY_SEND = LOCAL_PATH + "/gw/oauthentry/ishop.esurfing.pay/1.0/send";
var ESURFING_PAY_SEND = LOCAL_PATH + "/api/ishop/esurfing/pay/send/1.0";


//在线办卡实名认证
var MANAGE_CARD_USER_AUTH = LOCAL_PATH + "/gw/oauthentry/manage.bank.user/1.0/auth";
//var MANAGE_CARD_USER_AUTH = LOCAL_PATH + "/api/manage/bank/user/auth/1.0";
//查询用户在线办卡实名认证信息
var MANAGE_CARD_USER_JUDGE = LOCAL_PATH + "/gw/oauthentry/manage.bank.user/1.0/judge";
//var MANAGE_CARD_USER_JUDGE = LOCAL_PATH + "/api/manage/bank/user/judge/1.0";


//积分变现建行积分商城登录
var REALIZE_CCB_USER_LOGIN = LOCAL_PATH + "/gw/oauthentry/realization.ccb.login/1.0/submit";
//var REALIZE_CCB_USER_LOGIN = LOCAL_PATH + "/api/realization/ccb/login/submit/1.0";
//积分变现建行积分商城支付
var REALIZE_CCB_PAY_SUBMIT = LOCAL_PATH + "/gw/oauthentry/realization.ccb.pay/1.0/submit";
//var REALIZE_CCB_PAY_SUBMIT = LOCAL_PATH + "/api/realization/ccb/pay/submit/1.0";
//积分变现模式3保存券码
var REALIZE_SAVE_COUPON = LOCAL_PATH + "/gw/oauthentry/realization.coupon/1.0/save";
//var REALIZE_SAVE_COUPON = LOCAL_PATH + "/api/realization/coupon/save/1.0";
//积分变现自动登录平台
var REALIZE_LOGIN_PLATFORM = LOCAL_PATH + "/gw/oauthentry/realization.login/1.0/platform";
//var REALIZE_LOGIN_PLATFORM = LOCAL_PATH + "/api/realization/login/platform/1.0";
//积分变现建行积分商城自动登录平台
var REALIZE_CCB_AUTO_LOGIN = LOCAL_PATH + "/gw/oauthentry/realization.ccb.auto/1.0/login";
//var REALIZE_CCB_AUTO_LOGIN = LOCAL_PATH + "/api/realization/ccb/auto/login/1.0";

//积分变现天翼积分商城登录
var REALIZE_ESURFING_USER_LOGIN = LOCAL_PATH + "/gw/oauthentry/realization.esurfing.login/1.0/submit";
//var REALIZE_ESURFING_USER_LOGIN = LOCAL_PATH + "/api/realization/esurfing/login/submit/1.0";
//积分变现天翼积分商城支付
var REALIZE_ESURFING_PAY_SUBMIT = LOCAL_PATH + "/gw/oauthentry/realization.esurfing.pay/1.0/submit";
//var REALIZE_ESURFING_PAY_SUBMIT = LOCAL_PATH + "/api/realization/esurfing/pay/submit/1.0";
//积分变现天翼积分商城发送登录验证码
var REALIZE_ESURFING_USER_LOGIN_SEND = LOCAL_PATH + "/gw/oauthentry/realization.esurfing.login/1.0/send";
//var REALIZE_ESURFING_USER_LOGIN_SEND = LOCAL_PATH + "/api/realization/esurfing/login/send/1.0";

//积分变现移动积分商城登录
var REALIZE_CM_USER_LOGIN = LOCAL_PATH + "/gw/oauthentry/realization.cm/1.0/login";
//var REALIZE_CM_USER_LOGIN = LOCAL_PATH + "/api/realization/cm/login/1.0";
//积分变现移动积分商城获取图片验证码
var REALIZE_CM_GET_VCODE_PATH = LOCAL_PATH + "/gw/oauthentry/ishop.cm.vcode/1.0/get";
//积分变现移动积分商城获取短信验证码（下单）
var REALIZE_CM_GET_SMS = LOCAL_PATH + "/gw/oauthentry/realization.cm/1.0/sms";
//var REALIZE_CM_GET_SMS = LOCAL_PATH + "/api/realization/cm/sms/1.0";
//积分变现移动积分商城支付
var REALIZE_CM_PAY = LOCAL_PATH + "/gw/oauthentry/realization.cm/1.0/pay";
//var REALIZE_CM_PAY = LOCAL_PATH + "/api/realization/cm/pay/1.0";

//交行
//获取商品地址列表
var COM_GET_GOODS_CITY = LOCAL_PATH + "/gw/oauthentry/goods.getaddress/1.0/list";

//添加地址信息
var ADD_ADDR_PATH = LOCAL_PATH + "/gw/oauthentry/goods.getaddress/1.0/add";


//积分变现交通积分商城登录
var REALIZE_BOCOM_USER_LOGIN = LOCAL_PATH + "/gw/oauthentry/realization.bocom.login/1.0/submit";
//var REALIZE_BOCOM_USER_LOGIN = LOCAL_PATH + "/api/realization/bocom/login/submit/1.0";
//积分变现交通积分商城发送支付验证码
var REALIZE_BOCOM_PAY_SEND = LOCAL_PATH + "/gw/oauthentry/realization.bocom.pay/1.0/send";
//var REALIZE_BOCOM_PAY_SEND = LOCAL_PATH + "/api/realization/bocom/pay/send/1.0";
//积分变现交通积分商城支付
var REALIZE_BOCOM_PAY_SUBMIT = LOCAL_PATH + "/gw/oauthentry/realization.bocom.pay/1.0/submit";
//var REALIZE_BOCOM_PAY_SUBMIT = LOCAL_PATH + "/api/realization/bocom/pay/submit/1.0";


//根据订单号查询积分变现记录
var REALIZE_GET_RECORD = LOCAL_PATH + "/gw/oauthentry/realization.get/1.0/record";
//var REALIZE_GET_RECORD = LOCAL_PATH + "/api/realization/get/record/1.0";

//积分变现联通登录初始化
//var REALIZE_UNICOM_INIT_LOGIN =  LOCAL_PATH + "/gw/oauthentry/realization.unicom.init/1.0/submit";
var REALIZE_UNICOM_INIT_LOGIN =  LOCAL_PATH + "/api/realization/unicom/init/submit/1.0";
//积分变现联通获取图片验证码
var REALIZE_UNICOM_GET_IMAGECODE = LOCAL_PATH +"/gw/oauthentry/realization.unicom.login/1.0/imageCode";
//var REALIZE_UNICOM_GET_IMAGECODE = LOCAL_PATH +"/api/realization/unicom/login/imageCode/1.0";
//积分变现联通登录
var REALIZE_UNICOM_LOGIN = LOCAL_PATH +"/gw/oauthentry/realization.unicom.login/1.0/submit";
//var REALIZE_UNICOM_LOGIN = LOCAL_PATH +"/api/realization/unicom/login/submit/1.0";
//积分变现联通支付
var REALIZE_UNICOM_PAY_SUBMIT = LOCAL_PATH +"/gw/oauthentry/realization.unicom.pay/1.0/submit";
//var REALIZE_UNICOM_PAY_SUBMIT = LOCAL_PATH +"/api/realization/unicom/pay/submit/1.0";
//积分变现发送支付验证码
var REALIZE_UNICOM_PAY_SEND = LOCAL_PATH +"/gw/oauthentry/realization.unicom.pay/1.0/send";
//var REALIZE_UNICOM_PAY_SEND = LOCAL_PATH +"/api/realization/unicom/pay/send/1.0";



//第三方商城平安积分登录图片验证码
var PAB_LOGIN_IMAGECODE = LOCAL_PATH + "/gw/oauthentry/ishop.pab.login/1.0/imageCode";
//var PAB_LOGIN_IMAGECODE = LOCAL_PATH + "/api/ishop/pab/login/imageCode/1.0";
//第三方商城平安积分商城登录
var PAB_USER_LOGIN = LOCAL_PATH + "/gw/oauthentry/ishop.pab.login/1.0/submit";
//var PAB_USER_LOGIN = LOCAL_PATH + "/api/ishop/pab/login/submit/1.0";
//第三方商城平安积分商城发送支付短信
var PAB_PAY_SEND = LOCAL_PATH + "/gw/oauthentry/ishop.pab.pay/1.0/send";
//var PAB_PAY_SEND = LOCAL_PATH + "/api/ishop/pab/pay/send/1.0";
//第三方商城平安积分商城支付
var PAB_PAY_SUBMIT = LOCAL_PATH + "/gw/oauthentry/ishop.pab.pay/1.0/submit";
//var PAB_PAY_SUBMIT = LOCAL_PATH + "/api/ishop/pab/pay/submit/1.0";

//积分变现平安积分商城登录验证码
var REALIZE_PAB_LOGIN_IMAGECODE = LOCAL_PATH + "/gw/oauthentry/realization.pab.login/1.0/imageCode";
//var REALIZE_PAB_LOGIN_IMAGECODE = LOCAL_PATH + "/api/realization/pab/login/imageCode/1.0";
//积分变现平安积分商城登录
var REALIZE_PAB_USER_LOGIN = LOCAL_PATH + "/gw/oauthentry/realization.pab.login/1.0/submit";
//var REALIZE_PAB_USER_LOGIN = LOCAL_PATH + "/api/realization/pab/login/submit/1.0";
//积分变现平安积分商城下单验证码
var REALIZE_PAB_ORDER_IMAGECODE = LOCAL_PATH + "/gw/oauthentry/realization.pab.order/1.0/imageCode";
//var REALIZE_PAB_ORDER_IMAGECODE = LOCAL_PATH + "/api/realization/pab/order/imageCode/1.0";
//积分变现平安积分商城下单
var REALIZE_PAB_ORDER_SUBMIT = LOCAL_PATH + "/gw/oauthentry/realization.pab.order/1.0/submit";
//var REALIZE_PAB_ORDER_SUBMIT = LOCAL_PATH + "/api/realization/pab/order/submit/1.0";
//积分变现平安积分商城发送支付短信
var REALIZE_PAB_PAY_SEND = LOCAL_PATH + "/gw/oauthentry/realization.pab.pay/1.0/send";
//var REALIZE_PAB_PAY_SEND = LOCAL_PATH + "/api/realization/pab/pay/send/1.0";
//积分变现平安积分商城支付
var REALIZE_PAB_PAY_SUBMIT = LOCAL_PATH + "/gw/oauthentry/realization.pab.pay/1.0/submit";
//var REALIZE_PAB_PAY_SUBMIT = LOCAL_PATH + "/api/realization/pab/pay/submit/1.0";

//平安积分商城忘记密码图片验证码
var PAB_FORGOT_IMAGECODE = LOCAL_PATH + "/gw/oauthentry/ishop.pab.forgot/1.0/imageCode";
//var PAB_FORGOT_IMAGECODE = LOCAL_PATH + "/api/ishop/pab/forgot/imageCode/1.0";
//平安积分商城忘记密码第二张图片验证码
var PAB_FORGOT_IMAGECODE2 = LOCAL_PATH + "/gw/oauthentry/ishop.pab.forgot/1.0/imageCode2";
//var PAB_FORGOT_IMAGECODE2 = LOCAL_PATH + "/api/ishop/pab/forgot/imageCode2/1.0";
//平安积分商城忘记密码验证图片验证码
var PAB_FORGOT_VERIFY = LOCAL_PATH + "/gw/oauthentry/ishop.pab.forgot.verify/1.0/imageCode";
//var PAB_FORGOT_VERIFY = LOCAL_PATH + "/api/ishop/pab/forgot/verify/imageCode/1.0";
//平安积分商城忘记密码发送验证码
var PAB_FORGOT_SEND = LOCAL_PATH + "/gw/oauthentry/ishop.pab.forgot/1.0/send";
//var PAB_FORGOT_SEND = LOCAL_PATH + "/api/ishop/pab/forgot/send/1.0";
//平安积分商城忘记密码验证短信验证码
var PAB_FORGOT_VERIFY_SMS = LOCAL_PATH + "/gw/oauthentry/ishop.pab.forgot.verify/1.0/sms";
//var PAB_FORGOT_VERIFY_SMS = LOCAL_PATH + "/api/ishop/pab/forgot/verify/sms/1.0";
//平安积分商城忘记密码重置密码
var PAB_FORGOT_RESET = LOCAL_PATH + "/gw/oauthentry/ishop.pab.forgot/1.0/reset";
//var PAB_FORGOT_RESET = LOCAL_PATH + "/api/ishop/pab/forgot/reset/1.0";



//领取积分变现分享红包
var REALIZE_SHARE_RECEIVE_RECORD = LOCAL_PATH + "/gw/oauthentry/realization.share.receive/1.0/record";
//var REALIZE_SHARE_RECEIVE_RECORD = LOCAL_PATH + "/api/realization/share/receive/record/1.0";



//查询变现详情
var REALIZE_DETAILS = LOCAL_PATH + "/gw/oauthentry/realization.select/1.0/record";
//var REALIZE_DETAILS = LOCAL_PATH + "/api/realization/select/record/1.0";

//获取官网资讯分类列表
var GW_INFO_CLASSIFY_LIST = LOCAL_PATH + "/gw/oauthentry/info.classify/1.0/list";
//var GW_INFO_CLASSIFY_LIST = LOCAL_PATH + "/api/info/classify/list/1.0";
//官网资讯列表
var GW_INFO_LIST = LOCAL_PATH + "/gw/oauthentry/info.gw/1.0/list";
//var GW_INFO_LIST = LOCAL_PATH + "/api/info/gw/list/1.0";
//查询官网资讯
var GW_INFO_SELECT = LOCAL_PATH + "/gw/oauthentry/info.gw/1.0/select";
//var GW_INFO_SELECT = LOCAL_PATH + "/api/info/gw/select/1.0";

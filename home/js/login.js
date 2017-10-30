$(function(){
	var oH3 = $('.title h3');
	var oCent = $('.centBox');
	oH3.click(function(){
		var _index = $(this).index();
		//设置标头样式
		oH3.removeClass('current');
		$(this).addClass('current');
		//切换账号登录选择
		oCent.removeClass('current');
		oCent.eq(_index).addClass('current');
	})
})
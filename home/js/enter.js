$(function(){
  hover2();
  enter();
  w2();
})
//函数：鼠标划上合作账号，样式变化
function hover2(){
	var oA = $('.flat2 a');
	oA.hover(function(){
		var _index = $(this).index();
		if(_index == 1){
			$(this).css({"backgroundPosition":"1px -84px"});
		}
		if(_index == 2){
			$(this).css({"backgroundPosition":"-50px -84px"});
		}
		if(_index == 3){
			$(this).css({"backgroundPosition":"-101px -84px"});
		}
		if(_index == 4){
			$(this).css({"backgroundPosition":"-152px -84px"});
		}
	},
		function(){
		var _index = $(this).index();
		if(_index == 1){
			$(this).css({"backgroundPosition":"1px -34px"});
		}
		if(_index == 2){
			$(this).css({"backgroundPosition":"-50px -34px"});
		}
		if(_index == 3){
			$(this).css({"backgroundPosition":"-101px -34px"});
		}
		if(_index == 4){
			$(this).css({"backgroundPosition":"-152px -34px"});
		}
		}
	)
}
//函数：账号登录切换

function enter(){
	var oH2 = $('.title h2');
	var oCent = $('.centBox');
	oH2.click(function(){
		var _index = $(this).index();
		//设置标头样式
		oH2.removeClass('current');
		$(this).addClass('current');
		//切换账号登录选择
		oCent.removeClass('current');
		oCent.eq(_index).addClass('current');
	})
}
//设置不同屏幕的全屏图片
//function w2(){
//	var w = $(document).width();
//	var left = -(1920-w)/2;
//	$('.centent').css({'backgroundPosition':left+'px'});
//}















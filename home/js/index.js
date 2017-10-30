$(function(){
//=========头部选项卡  start=========
	$(".mSelect").hover(function(){
		$(this).css({"background":"#fff","border-left":"1px solid  #e5e5e5","border-right":"1px solid #e5e5e5"});
		this.getElementsByTagName("div")[0].style.display = "block";	
	},	
	function(){
		$(this).css({"background":"#F2F2F2","border-left":"1px solid #F2F2F2","border-right":"1px solid #F2F2F2"});
		this.getElementsByTagName("div")[0].style.display = "none";
	});
//=========头部选项卡 end=============

//============metu start(菜单选项卡)===============
	$('.list-box').hover(function(){
		$(this).css({"background":"#eee","border-left":"2px solid #c00"});
		this.getElementsByClassName('right-box')[0].style.display = "block";
	},	
	function(){
		$(this).css({"background":"#fff","border-left":"2px solid #fff"});
		this.getElementsByClassName('right-box')[0].style.display = "none";
	});
//==============metu end===============

//===============box start(选项卡)=====================
	$('.liBl').mouseover(function(){
		$('.liBox').css({"display":"none"});
		this.getElementsByClassName('liBox')[0].style.display = "block";
		$('.blTitle').removeClass('blTitle2');
		this.getElementsByClassName('blTitle')[0].className = "blTitle blTitle2";
	})
//===============box end=====================

//===============infor start(公告信息选项卡)=====================
	$('.ibLi').mouseover(function(){
		$('.inforCentent').css({"display":"none"});
		this.getElementsByClassName('inforCentent')[0].style.display = "block";
		$('.inforTitle').removeClass('inforTitle2');
		this.getElementsByClassName('inforTitle')[0].className = "inforTitle inforTitle2";
	})
//===============infor start(公告信息选项卡) end=====================

// =================优惠推荐切换 start============================
	you();
	function you(){
		var $oYou = $('.youBox').eq(0);
		var $oUl = $oYou.find('.ulBox');
		var $oLis = $oUl.find('.li');
		var $oLeft = $oYou.find('.left');
		var $oRight = $oYou.find('.right');
		var $oNavList = $('.you').find('.navList');
		var len = $oLis.length;
		var index = 0;

		//左边按钮
		$oLeft.click(function(){
			index--;
			if(index < 0){
				index = 0;
			}
			move(index);
		});
		//右边按钮
		$oRight.click(function(){
			index++;
			if(index > len-1){
				index = len-1;
			}
			move(index);
		});

		//切换函数
		function move(index){
			$oUl.animate({
				"left":index*(-1200)+"px"
			},1000);
			$oNavList.removeClass('current');
			$oNavList.eq(index).addClass('current');
		}
		
	}
// =================优惠推荐切换 end============================	

//==================优惠推荐 限时抢 start======================
	//限时抢
	var flash = setInterval(flashSale,500);
	function flashSale(){
		var newTime = new Date();//获取当前时间
		var endTime = new Date("2017/12/20,00:00:00");//设置结束时间
		var time = endTime.getTime() - newTime.getTime();//获取毫秒数
		
		var h = parseInt(time/1000/60/60);//获取小时数
		var m = parseInt(time/1000/60%60);//获取分钟数
		var s = parseInt(time/1000%60);//获取秒数
		
		h = checkTime(h);
		m = checkTime(m);
		s = checkTime(s);
		function checkTime(i){
			if(i<10){
				i = "0"+i;
			}
			return i;
		}
		
		var flash = "剩余：<span>"+h+"</span>小时<span>"+m+"</span>分钟<span>"+s+"</span>秒"
		var oUl = document.getElementsByClassName('ulBox')[0];
		var p = oUl.getElementsByTagName('p');
		for(var i=0;i<p.length;i++){
				p[i].innerHTML = flash;
		}
	
	}
//==================优惠推荐 限时抢 end======================

//================轮播图 start===================== 
    slider();
    function slider(){
    	var duration = 2000;//定义变量
	var playTime = 500;//定义变量	

	//===轮播大图 start====
	slider1(duration,playTime);//调用 slider 函数
	function slider1(duration,playTime){
		//获取元素
		var $onewLi = $('.sliderBanner li').eq(0).clone();
		$('.bannerBox').append($onewLi)
		var $oUL = $('.bannerBox');
		var $oLIs = $('.bannerBox li');
		var $oNavList = $('.slider_num').children();
		var index = 0;
		var imgLength = $oLIs.length-1;
		//获取小轮播图元素
		var $onewLi2 = $('.smSlider_box li').eq(0).clone();
		$('.smSlider_box').append($onewLi2)
		var $oUL2 = $('.smSlider_box');
		var $oLIs2 = $('.smSlider_box li');
		
		var w = $(document).width();//屏幕的宽度
		var imgWidth = $oUL.width()/(imgLength+1);//图片的宽度
		
		//设置初始图片的 left 
		$oUL.css({
					'left':-(imgWidth-w)/2+'px'
				});
		
		//自动轮播
		var timer = setInterval(function(){
			auter();
		},duration);
		  function auter(){
		  	index++;
				if(index>imgLength){
					index = 1;
					$oUL.css({
						'left':(imgWidth-w)/2+'px'
					});
					$oUL2.css({
						'left':0+'px'
					});
				}
				move(index);
		  }
	  
		clearTimer($oUL);
		clearTimer($oNavList);
		clearTimer($oUL2);
		
		//鼠标划上，停止自动播放
		function clearTimer($ele){
			$ele.hover(function(){
				clearInterval(timer);
			},function(){
				clearInterval(timer);
				timer = setInterval(function(){
					auter();
				},duration);
			});
		}
		
		//点击小按钮切换图片
		$oNavList.each(function(){
			var _index = $(this).index();
			$(this).on("click",function(){
				if(_index>=imgLength){
					_index = 1;
				}
				index = _index;
				move(_index);
			})		
		})
		
		//函数：点击切换图片，图片动画
		function move(index){
			$oUL.stop().animate({
				'left':index*(-imgWidth)-(imgWidth-w)/2+'px'
			},playTime);
			$oUL2.stop().animate({
				'left':index*(-190)+'px'
			},playTime);
			//小图标样式随着图片切换变化
			$oNavList.removeClass('current');
			$oNavList.eq(index>=imgLength?0:index).addClass('current');	
		}	
		
	}
	//===轮播大图 end====




//========楼层 轮播图 start============
  //1F
             var f1 = ".fbox1";
	floorSlider1(duration,playTime,f1);
	function floorSlider1(duration,playTime,f){
		var $onewLi = $(f+' li').eq(0).clone();
		$(f).append($onewLi);
		var $oUL = $(f);
		var $oLIs = $(f+' li');
		var $oNavList = $('.sc1').children();
		var index = 0;
		var imgLength = $oLIs.length-1;
     
		$oUL.css({"width":(imgLength+1)*210+"px"});
		//自动轮播
		var timer = setInterval(function(){
			auter();
		},duration);
	  
		  function auter(){
		  	index++;
				if(index>imgLength){
					index = 1;
					$oUL.css({
						'left':0+'px'
					});
				}
				move(index);
		  }
	  
		clearTimer($oUL);
		clearTimer($oNavList);
		
		//鼠标划上，停止自动播放
		function clearTimer($ele){
			$ele.hover(function(){
				clearInterval(timer);
			},function(){
				clearInterval(timer);
				timer = setInterval(function(){
					auter();
				},duration);
			});	
		}
		
		//点击小按钮切换图片
		$oNavList.each(function(){
			var _index = $(this).index();
			$(this).on("click",function(){
				if(_index>=imgLength){
					_index = 1;
				}
				index = _index;
				move(_index);
			})	
		})
		
		//函数：图片动画
		function move(index){	
			$oUL.stop().animate({
				'left':index*(-210)+'px'
			},playTime);
			//小图标样式随着图片切换变化
			$oNavList.removeClass('current');
			$oNavList.eq(index>=imgLength?0:index).addClass('current');	
		}	
		
	}
	
	//2F
	var f2 = ".fbox2";
	floorSlider2(duration,playTime,f2);
	function floorSlider2(duration,playTime,f){
		var $onewLi = $(f+' li').eq(0).clone();
		$(f).append($onewLi);
		var $oUL = $(f);
		var $oLIs = $(f+' li');
		var $oNavList = $('.sc2').children();
		var index = 0;
		var imgLength = $oLIs.length-1;
     
		$oUL.css({"width":(imgLength+1)*210+"px"});
		//自动轮播
		var timer = setInterval(function(){
			auter();
		},duration);
	  
		  function auter(){
		  	index++;
				if(index>imgLength){
					index = 1;
					$oUL.css({
						'left':0+'px'
					});
				}
				move(index);
		  }
	  
		clearTimer($oUL);
		clearTimer($oNavList);
		
		//鼠标划上，停止自动播放
		function clearTimer($ele){
			$ele.hover(function(){
				clearInterval(timer);
			},function(){
				clearInterval(timer);
				timer = setInterval(function(){
					auter();
				},duration);
			});	
		}
		
		//点击小按钮切换图片
		$oNavList.each(function(){
			var _index = $(this).index();
			$(this).on("click",function(){
				if(_index>=imgLength){
					_index = 1;
				}
				index = _index;
				move(_index);
			})	
		})
		
		//函数：图片动画
		function move(index){	
			$oUL.stop().animate({
				'left':index*(-210)+'px'
			},playTime);
			//小图标样式随着图片切换变化
			$oNavList.removeClass('current');
			$oNavList.eq(index>=imgLength?0:index).addClass('current');	
		}	
		
	}
	
	//3F
	var f3 = ".fbox3";
	floorSlider3(duration,playTime,f3);
	function floorSlider3(duration,playTime,f){
		var $onewLi = $(f+' li').eq(0).clone();
		$(f).append($onewLi);
		var $oUL = $(f);
		var $oLIs = $(f+' li');
		var $oNavList = $('.sc3').children();
		var index = 0;
		var imgLength = $oLIs.length-1;
     
		$oUL.css({"width":(imgLength+1)*210+"px"});
		//自动轮播
		var timer = setInterval(function(){
			auter();
		},duration);
	  
		  function auter(){
		  	index++;
				if(index>imgLength){
					index = 1;
					$oUL.css({
						'left':0+'px'
					});
				}
				move(index);
		  }
	  
		clearTimer($oUL);
		clearTimer($oNavList);
		
		//鼠标划上，停止自动播放
		function clearTimer($ele){
			$ele.hover(function(){
				clearInterval(timer);
			},function(){
				clearInterval(timer);
				timer = setInterval(function(){
					auter();
				},duration);
			});	
		}
		
		//点击小按钮切换图片
		$oNavList.each(function(){
			var _index = $(this).index();
			$(this).on("click",function(){
				if(_index>=imgLength){
					_index = 1;
				}
				index = _index;
				move(_index);
			})	
		})
		
		//函数：图片动画
		function move(index){	
			$oUL.stop().animate({
				'left':index*(-210)+'px'
			},playTime);
			//小图标样式随着图片切换变化
			$oNavList.removeClass('current');
			$oNavList.eq(index>=imgLength?0:index).addClass('current');	
		}	
		
	}
	
	//4F
	var f4 = ".fbox4";
	floorSlider4(duration,playTime,f4);
	function floorSlider4(duration,playTime,f){
		var $onewLi = $(f+' li').eq(0).clone();
		$(f).append($onewLi);
		var $oUL = $(f);
		var $oLIs = $(f+' li');
		var $oNavList = $('.sc4').children();
		var index = 0;
		var imgLength = $oLIs.length-1;
     
		$oUL.css({"width":(imgLength+1)*210+"px"});
		//自动轮播
		var timer = setInterval(function(){
			auter();
		},duration);
	  
		  function auter(){
		  	index++;
				if(index>imgLength){
					index = 1;
					$oUL.css({
						'left':0+'px'
					});
				}
				move(index);
		  }
	  
		clearTimer($oUL);
		clearTimer($oNavList);
		
		//鼠标划上，停止自动播放
		function clearTimer($ele){
			$ele.hover(function(){
				clearInterval(timer);
			},function(){
				clearInterval(timer);
				timer = setInterval(function(){
					auter();
				},duration);
			});	
		}
		
		//点击小按钮切换图片
		$oNavList.each(function(){
			var _index = $(this).index();
			$(this).on("click",function(){
				if(_index>=imgLength){
					_index = 1;
				}
				index = _index;
				move(_index);
			})	
		})
		
		//函数：图片动画
		function move(index){	
			$oUL.stop().animate({
				'left':index*(-210)+'px'
			},playTime);
			//小图标样式随着图片切换变化
			$oNavList.removeClass('current');
			$oNavList.eq(index>=imgLength?0:index).addClass('current');	
		}	
		
	}
	
	//5F
	var f5 = ".fbox5";
	floorSlider5(duration,playTime,f5);
	function floorSlider5(duration,playTime,f){
		var $onewLi = $(f+' li').eq(0).clone();
		$(f).append($onewLi);
		var $oUL = $(f);
		var $oLIs = $(f+' li');
		var $oNavList = $('.sc5').children();
		var index = 0;
		var imgLength = $oLIs.length-1;
     
		$oUL.css({"width":(imgLength+1)*210+"px"});
		//自动轮播
		var timer = setInterval(function(){
			auter();
		},duration);
	  
		  function auter(){
		  	index++;
				if(index>imgLength){
					index = 1;
					$oUL.css({
						'left':0+'px'
					});
				}
				move(index);
		  }
	  
		clearTimer($oUL);
		clearTimer($oNavList);
		
		//鼠标划上，停止自动播放
		function clearTimer($ele){
			$ele.hover(function(){
				clearInterval(timer);
			},function(){
				clearInterval(timer);
				timer = setInterval(function(){
					auter();
				},duration);
			});	
		}
		
		//点击小按钮切换图片
		$oNavList.each(function(){
			var _index = $(this).index();
			$(this).on("click",function(){
				if(_index>=imgLength){
					_index = 1;
				}
				index = _index;
				move(_index);
			})	
		})
		
		//函数：图片动画
		function move(index){	
			$oUL.stop().animate({
				'left':index*(-210)+'px'
			},playTime);
			//小图标样式随着图片切换变化
			$oNavList.removeClass('current');
			$oNavList.eq(index>=imgLength?0:index).addClass('current');	
		}	
		
	}

//========楼层 轮播图 end============


//========公告信息轮播图 start=======
  //第一个
	var m1 = ".ms1";
	ms1(duration,playTime,m1);
	function ms1(duration,playTime,f){
		var $onewLi = $(f+' li').eq(0).clone();
		$(f).append($onewLi);
		var $oUL = $(f);
		var $oLIs = $(f+' li');
		var $oNavList = $('.msc1').children();
		var index = 0;
		var imgLength = $oLIs.length-1;
     
		$oUL.css({"width":(imgLength+1)*268+"px"});
		//自动轮播
		var timer = setInterval(function(){
			auter();
		},duration);
	  
		  function auter(){
		  	index++;
				if(index>imgLength){
					index = 1;
					$oUL.css({
						'left':0+'px'
					});
				}
				move(index);
		  }
	  
		clearTimer($oUL);
		clearTimer($oNavList);
		
		//鼠标划上，停止自动播放
		function clearTimer($ele){
			$ele.hover(function(){
				clearInterval(timer);
			},function(){
				clearInterval(timer);
				timer = setInterval(function(){
					auter();
				},duration);
			});	
		}
		
		//点击小按钮切换图片
		$oNavList.each(function(){
			var _index = $(this).index();
			$(this).on("click",function(){
				if(_index>=imgLength){
					_index = 1;
				}
				index = _index;
				move(_index);
			})	
		})
		
		//函数：图片动画
		function move(index){	
			$oUL.stop().animate({
				'left':index*(-268)+'px'
			},playTime);
			//小图标样式随着图片切换变化
			$oNavList.removeClass('current');
			$oNavList.eq(index>=imgLength?0:index).addClass('current');	
		}	
		
	}
	
	//第二个
	var m2 = ".ms2";
	ms2(duration,playTime,m2);
	function ms2(duration,playTime,f){
		var $onewLi = $(f+' li').eq(0).clone();
		$(f).append($onewLi);
		var $oUL = $(f);
		var $oLIs = $(f+' li');
		var $oNavList = $('.msc2').children();
		var index = 0;
		var imgLength = $oLIs.length-1;
     
		$oUL.css({"width":(imgLength+1)*268+"px"});
		//自动轮播
		var timer = setInterval(function(){
			auter();
		},duration);
	  
		  function auter(){
		  	index++;
				if(index>imgLength){
					index = 1;
					$oUL.css({
						'left':0+'px'
					});
				}
				move(index);
		  }
	  
		clearTimer($oUL);
		clearTimer($oNavList);
		
		//鼠标划上，停止自动播放
		function clearTimer($ele){
			$ele.hover(function(){
				clearInterval(timer);
			},function(){
				clearInterval(timer);
				timer = setInterval(function(){
					auter();
				},duration);
			});	
		}
		
		//点击小按钮切换图片
		$oNavList.each(function(){
			var _index = $(this).index();
			$(this).on("click",function(){
				if(_index>=imgLength){
					_index = 1;
				}
				index = _index;
				move(_index);
			})	
		})
		
		//函数：图片动画
		function move(index){	
			$oUL.stop().animate({
				'left':index*(-268)+'px'
			},playTime);
			//小图标样式随着图片切换变化
			$oNavList.removeClass('current');
			$oNavList.eq(index>=imgLength?0:index).addClass('current');	
		}	
		
	}
 }
//========公告信息轮播图 end=======
//================轮播图 end===================== 
	
//========楼层导航 satrt=================
//定位,调响应式
  var W = $(window).width();//浏览器可视区域的宽度
  var H = $(window).height();//浏览器可视区域的高度
   if(W < 1300){
   	$('.stairsNav').css({"left":-100+"px"});
   }
  var oh1 = $('.stairsNav').height();//stairsNav的高度
  $('.stairsNav').css({"top":(H - oh1)/2+"px"});
//定位 nav ，调响应式
  if(W < 1236){
  	$('.main').removeClass('main');
  	$('.header').removeClass('header');
  	$('.nav-warp').removeClass('nav-warp');
  	$('.footer').removeClass('footer');
  }
  
//鼠标移上，导航样式改变
$(".stairsNav li").not(".last").hover(function(){ 
	    $(this).removeClass("active");
			$(this).addClass("active1");
	},function(){
			$(this).removeClass("active1");
			var oLiClass = this.className;
			var oLic = oLiClass == "sf1" || oLiClass == "sf2" || oLiClass == "sf3" || oLiClass == "sf4" ||oLiClass == "sf5";
			if(oLic){
				$(this).addClass("active");
			}
	});	
	
	//点击top 回到顶部
	$(".last").on("click",function(){
		$("html,body").animate({
			scrollTop:0
		},1000)
		
	})
	
	//点击导航，跳转到相应的楼层
	$(".stairsNav li").not(".last").on("click",function(){
		var _index = $(this).index();//获取当前li的索引值
		var _height = $(".F").eq(_index).offset().top;//获取当前索引值对应楼层距离顶部的高度
//  var oMain = document.getElementsByClassName("main")[0];
//  var oMainLi = oMain.getElementsByTagName("li")[_index];
//  var _height = oMainLi.offsetTop;
//	js方法 

		$("html,body").animate({
			scrollTop:_height
		},500)
	})
	
	//鼠标滚动到楼层区域时，楼梯导航出现
	$(window).scroll(function(){
		var h = $(this).scrollTop();//当前滚动的高度
		var heigt1 = $(".F").first().offset().top;//1f距离顶部是高度
		var height2 = $(".F").last().offset().top;//最后一个楼层f距离顶部是高度
		//如果楼层出现，楼梯导航弹出，否则隐藏
		if(h > heigt1-200 && h < height2+100){
			$(".stairsNav").fadeIn();
		}else{
			$(".stairsNav").fadeOut();
		}
  
		//给楼层对应的导航设置样式
		$(".F").each(function(){
			var _index = $(this).index();//当前楼层的索引值
			var _height1 = $(this).height();//当前楼层的高度
			var _height2 = $(".F").eq(_index).offset().top;//获取当前楼层距离顶部的高度
			if(h > _height2-_height1/2){
				$(".stairsNav li").eq(_index).removeClass("active").siblings().addClass("active");
				$(".stairsNav li").eq(_index).addClass("active2").siblings().removeClass("active2");
			}
		})
		
	})
//==========楼层导航 end=================

//==========楼层 本周热销选项卡 start==========
	$('.hotTitle li').mouseover(function(){
		var _index = $(this).index();//获取当前索引
		$(this).parent().find('a').removeClass("h_current");//删除所有的a标签样式
		$(this).find('a').addClass("h_current");//给当前的a标签加特定的样式
		$(this).parent().parent().parent().parent().find('.hsUL').removeClass("hs_show");
		$(this).parent().parent().parent().parent().find('.hsUL').eq(_index).addClass("hs_show");
	})
//==========楼层 本周热销选项卡 start==========

//===========recommend 官方推荐 start===========
  //官方推荐 选项卡
	$('.rcdBox').mouseover(function(){
		$('.rcdConttent').css({"display":"none"});
		this.getElementsByClassName('rcdConttent')[0].style.display = "block";
		$('.rcdBox').removeClass('rcdMark');
		this.className = "rcdBox rcdMark";
	})
	
	//官方推荐  动画
	$('.rcdConttent img').hover(function(){
		$(this).animate({
			'margin-left':-80+"px"
		},500)
	},function(){
		$(this).animate({
			'margin-left':0+"px"
		},500)
	})

//===========recommend 官方推荐 end===========

//=========body 右侧边栏start===========
  //定位
  
  var oh = $('.rightWrap').height();//rightWrap的高度
  $('.rightWrap').css({"margin-top":(H - oh)/2+"px"});
  //选项卡
  $('.rightWrap .r_li').hover(function(){
  	var _index = $(this).index();
  	$(this).css({"background":"#CF1C23","color":"#fff"});
  	if(_index == 0){
  		this.getElementsByTagName('i')[0].style.backgroundPosition = "-20px -163px";
  		this.getElementsByClassName('libox')[0].style.display = "block";
  	}else if(_index == 1){
			this.getElementsByTagName('i')[0].style.backgroundPosition = "-60px -163px";
			this.getElementsByClassName('libox')[0].style.display = "block";
		}else if(_index == 2){
			this.getElementsByTagName('i')[0].style.backgroundPosition = "-140px -163px";
		}else if(_index == 3){
			this.getElementsByTagName('i')[0].style.backgroundPosition = "-65px -330px";
		}else if(_index == 4){
			this.getElementsByTagName('i')[0].style.backgroundPosition = "2px -202px";
			this.getElementsByClassName('libox')[0].style.display = "block";
		}else if(_index == 5){
			this.getElementsByTagName('i')[0].style.backgroundPosition = "-20px -201px";
		}else if(_index == 6){
			this.getElementsByTagName('i')[0].style.backgroundPosition = "-40px -201px";
		}
		
  },function(){
  	var _index = $(this).index();
  	$(this).css({"background":"#fff","color":"#333"});
  	if(_index == 0){
  		this.getElementsByTagName('i')[0].style.backgroundPosition = "0px -163px";
  		this.getElementsByClassName('libox')[0].style.display = "none";
  	}else if(_index == 1){
			this.getElementsByTagName('i')[0].style.backgroundPosition = "-40px -163px";
			this.getElementsByClassName('libox')[0].style.display = "none";
		}else if(_index == 2){
			this.getElementsByTagName('i')[0].style.backgroundPosition = "-120px -163px";
		}else if(_index == 3){
			this.getElementsByTagName('i')[0].style.backgroundPosition = "-45px -330px";
		}else if(_index == 4){
			this.getElementsByTagName('i')[0].style.backgroundPosition = "2px -186px";
			this.getElementsByClassName('libox')[0].style.display = "none";
		}else if(_index == 5){
			this.getElementsByTagName('i')[0].style.backgroundPosition = "-20px -185px";
		}else if(_index == 6){
			this.getElementsByTagName('i')[0].style.backgroundPosition = "-40px -186px";
		}
  });
  
  //返回顶部按钮
  $('.retrun1').click(function(){
  	$("html,body").animate({
			scrollTop:0
		},1000)
  });

//=========body 右侧边栏start===========
});







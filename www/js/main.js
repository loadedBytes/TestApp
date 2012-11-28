$(function(){

	var screenWidth = $(document).width();
	var headerHeight = $("#header").height();
	var footerHeight = $(".footer_wrap").height();
	var selectedIndex = 1;
	var self = this;
	var contentHeight = $($(".visual_wrap")[selectedIndex-1]).height();
	var contentLimitHeight = $(window).height()-(headerHeight+footerHeight);
	
	function onResizeHandler(){
		screenWidth = $(window).width();
		contentHeight = $($(".visual_wrap")[selectedIndex-1]).height();
		contentLimitHeight = $(window).height()-(headerHeight+footerHeight);
		contentLimitHeight = Math.max(contentLimitHeight, contentHeight);
		
		initSectionScale();
	}
	
	function initSectionScale(){
		var itemlist = $(".slider .item");
		var count = parseInt(itemlist.length, 10);
		var viewport = $(".iosSlider");
			viewport.css("height", Math.min(contentLimitHeight,650));
	}
	
	function startArticleEnterAnimation(sign){
		var list = $(".article0"+selectedIndex+"_con > li");
		var count = list.length;

		for(var i=0; i<count; i++){
			var article = list[i];
			if(article){
				$(article).css("position", "relative").css("left", 0);
				var delay = i*.0;
				TweenLite.to(article, .5, {delay:delay, css:{left:sign*50}, onComplete:function(e){ TweenLite.to(e, .5, {css:{left:0}}); }, onCompleteParams:[article]});
			}
		}
	}

	var bgRightOffset = [13,0,5,0];	
	function enterVisualAnimation(n, sign){
		var visual = $(".visual_bg_wrap:eq("+n+")");
		TweenLite.to(visual, .8, {css:{marginLeft:0, alpha:1}});
		
		var bg = $(".visual_bg0"+(n+1));
		if(bg){
			TweenLite.to(bg, .8, {css:{right:bgRightOffset[n]}, ease:Back.easeOut});
		}
	}
	
	function leaveVisualAnimation(n, sign){
		var visual = $(".visual_bg_wrap:eq("+n+")");
		if(visual){
			visual.css("margin-left", -100).css("opacity", 0);
		}
		
		var bg = $(".visual_bg0"+(n+1));
		if(bg){
			bg.css('right', -100);
		}
	}	
	
	function onPageChangeComplete(args){
		contentHeight = $($(".visual_wrap")[selectedIndex-1]).height();
		
		var idx = args.currentSlideNumber;
		var list = $(".btn_paging >li");
		var count = list.length;
		var sign = (selectedIndex < ( idx )) ? -1:1;
		
		for(var i=0; i<count; i++){
			var btn = $(list[i]);
			if(btn){
				if(idx-1==i){
					btn.addClass("on"); 
				}else{ 
					btn.removeClass("on");
					if(!isMobile) leaveVisualAnimation(i, sign); 
				}
			}
		}

		if(selectedIndex != idx){
			selectedIndex = idx;
			if(!isMobile) startArticleEnterAnimation(sign);
			if(!isMobile) enterVisualAnimation(idx-1, sign);
		}
	}
	
	function keypressHandler(e){
		switch(e.which){
			case 39:
				break;
			case 37:
				break;
			default:
				break;
		}//end switch
	}
	
	
	function initListeners(){
		if(!isMobile){
			var list = $(".visual_bg_wrap");
			list.each(function(n, me){
				$(me).css("opacity", 1);
			});
		}
	}
	
	function slideComplete(){}
	function sliderLoaded(){}
	
	var isMobile = false;
	function init(){
		var tmpUser = navigator.userAgent;  
		if (tmpUser.indexOf("iPhone") > 0 || tmpUser.indexOf("iPod") > 0 || tmpUser.indexOf("Android ") > 0 )  isMobile = true;

		initListeners();
		onResizeHandler();
		
		$(document).keydown(keypressHandler);
		$(window).resize(onResizeHandler);
		
		$('.iosSlider').iosSlider({
			desktopClickDrag: true,
			snapToChildren: true,
			navSlideSelector: '.btn_paging .icon',
			onSlideComplete: slideComplete,
			onSliderLoaded: sliderLoaded,
			onSlideChange: onPageChangeComplete,
			autoSlide: false,
			scrollbar: false/*,
			scrollbarContainer: '.sliderContainer .scrollbarContainer',
			scrollbarMargin: '0',
			scrollbarBorderRadius: '0'*/
		});		
		
		//$("#contents").touchSlider({duration:500, delay:3000, mouseTouch: true, namespace:"touchslider", autoplay:false, onComplete:onPageChangeComplete});
		
		onPageChangeComplete({currentSlideNumber:1});	
	}


	init();
	
});

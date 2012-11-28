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
		var itemlist = $(".touchslider-viewport .touchslider-item");
		var count = parseInt(itemlist.length, 10);
		var viewport = $(".touchslider-viewport");
			viewport.css("width", screenWidth).css("height", contentLimitHeight);

		for(var i=0; i<count; i++){
			var item = itemlist[i];
			if(item)
			{
				$(item).css("width", screenWidth).css("height", contentLimitHeight);
			}
		}
		

		var scroller = viewport.children();
			scroller.css({
				height: contentLimitHeight
			});
			
	}
	
	function startArticleEnterAnimation(sign){
		var list = $(".article0"+selectedIndex+"_con > li");
		var count = list.length;

		for(var i=0; i<count; i++){
			var article = list[i];
			if(article){
				$(article).css("position", "relative").css("left", 0);
				var delay = i*.0;
				TweenLite.to(article, .2, {delay:delay, css:{left:sign*50}, onComplete:function(e){ TweenLite.to(e, .5, {css:{left:0}}); }, onCompleteParams:[article]});
			}
		}
	}

	var bgRightOffset = [13,0,5,0];	
	function enterVisualAnimation(n, sign){
		var visual = $(".visual_bg_wrap:eq("+n+")");
		TweenLite.to(visual[0], .8, {css:{marginLeft:0}});
		
		var bg = $(".visual_bg0"+(n+1));
		if(bg){
			TweenLite.to(bg, .8, {css:{right:bgRightOffset[n]}, ease:Back.easeOut});
		}		
	}
	
	function leaveVisualAnimation(n, sign){
		var visual = $(".visual_bg_wrap:eq("+n+")");
		if(visual){
			visual.css("margin-left", -100);
		}
		
		var bg = $(".visual_bg0"+(n+1));
		if(bg){
			bg.css('right', -100);
		}
	}	
	
	function onPageChangeComplete(isTouch){
		contentHeight = $($(".visual_wrap")[selectedIndex-1]).height();
		
		var idx = $("#contents").data("touchslider").current;
		var list = $(".btn_paging >li");
		var count = list.length;
		var sign = (selectedIndex < ( idx+1 )) ? -1:1;
		
		for(var i=0; i<count; i++){
			var btn = $(list[i]);
			if(btn){
				if(idx==i){
					btn.addClass("on"); 
				}else{ 
					btn.removeClass("on");
					leaveVisualAnimation(i, sign); 
				}
			}
		}
		
		if(selectedIndex != idx+1){
			selectedIndex = idx+1;
			startArticleEnterAnimation(sign);
			enterVisualAnimation(idx, sign);
		}
	}
	
	function keypressHandler(e){
		switch(e.which){
			case 39:
				$("#contents").data("touchslider").next();
				break;
			case 37:
				$("#contents").data("touchslider").prev();
				break;
			default:
				break;
		}//end switch
	}
	
	
	function initListeners(){
		//$("#contents").data("touchslider").step(idx);
		$(".btn_paging >li").click(function(e){
			var idx = parseInt($(e.target).attr("id"))-1;
			$("#contents").data("touchslider").step(idx);
		})
	}
	
	function init(){
		initListeners();
		onResizeHandler();
		
		$(document).keydown(keypressHandler);
		$(window).resize(onResizeHandler);
		$("#contents").touchSlider({duration:500, delay:3000, mouseTouch: true, namespace:"touchslider", autoplay:false, onComplete:onPageChangeComplete});
		
		onPageChangeComplete(false);	
	}


	init();
	
});

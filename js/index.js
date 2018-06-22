$(document).ready(function(){
	var brower_type = '';
	var get_browser_type = function() {
		var agent = navigator.userAgent.toLowerCase() ;
		 
		var regStr_ie = /msie [\d.]+;/gi ;
		var regStr_ff = /firefox\/[\d.]+/gi
		var regStr_chrome = /chrome\/[\d.]+/gi ;
		var regStr_saf = /safari\/[\d.]+/gi ;
		//IE
		if(agent.indexOf("msie") > 0)
		{
		console.log(agent.match(regStr_ie));
			brower_type = 'ie';
			second_page_ie();
		}
		//firefox
		if(agent.indexOf("firefox") > 0)
		{
		console.log(agent.match(regStr_ff));
		}
		//Safari
		if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0)
		{
		console.log(agent.match(regStr_saf));
		}
		//Chrome
		if(agent.indexOf("chrome") > 0)
		{
		console.log(agent.match(regStr_chrome));
		}
	};
	get_browser_type();
		varheight = $(".banner").innerHeight();
		var index = 0;
		$(".focus-list").on("click",".focus-btn",function(event) {
			$(".focus-btn").removeClass('focus-btn-active');
			var target = $(event.target);
			index = $(".focus-btn").index(this);
			target.addClass('focus-btn-active');
			var list = $('.nav-item');
			$('.nav-item').removeClass('nav-item-active');
			for(var i=0;i<list.length;i++) {
				if(index==i) {
					$(list[i]).addClass('nav-item-active')
				}
			}
			slider();
		});
		$(".focus-arrow-list").on("click",".focus-arrow",function(event) {
			var arrow_type = $(".focus-arrow").index(this);
			if(!arrow_type) {
				up_slider();
				slider();
			}else{
				down_slider();
				slider();
			}
		});
		$(".nav-rt").on("click",".nav-item",function(event) {
			index = $(".nav-item").index(this);
			$(".nav-item").removeClass('nav-item-active');
			var target = $(event.target);
			target.addClass('nav-item-active');
			$(".focus-btn").removeClass('focus-btn-active');
			var list = $(".focus-btn");
			for(var i=0;i<list.length;i++) {
				if(index==i) {
					$(list[i]).addClass('focus-btn-active')
				}
			}
			slider();
		})
		function second_page_ie() {
			$(".second-page-title").addClass('second-page-title-active');
	    	$('.cover-hand-move').css('display','none');
	    	$('.container-hand-move-s').css('display','block');
	    	$('.container-hand-move-s .hold-hand-s img').css('transform','rotate(35deg)');
	    	$('.container-hand-move-s').addClass('container-hand-move-ie');
	    	console.log($('.second-page-title'))
	    	$('.hold-hand-s').addClass('hold-hand');
	    	$('.aptitude-list').css('width','320px');
		};
		function second_page() {
			$(".second-page-title").addClass('second-page-title-active');
	    	$('.cover-hand-move').css('display','none');
	    	$('.container-hand-move-s').css('display','block');
	    	$('.container-hand-move-s').addClass('container-hand-move');
	    	$('.hold-hand-s').addClass('hold-hand');
	    	$('.aptitude-list').css('width','320px')
		};
		function up_slider() {
			if(index > 0) {
				index--;
				$($(".focus-btn-active").prev()).addClass('focus-btn-active');
				$($(".focus-btn-active")[1]).removeClass('focus-btn-active');
				$($(".nav-item-active").prev()).addClass('nav-item-active');
				$($(".nav-item-active")[1]).removeClass('nav-item-active');
			}
		};
		function down_slider() {
			if(index < $(".focus-btn").length-1) {
				index++;
				$($(".focus-btn-active").next()).addClass('focus-btn-active');
				$($(".focus-btn-active")[0]).removeClass('focus-btn-active');
				$($(".nav-item-active").next()).addClass('nav-item-active');
				$($(".nav-item-active")[0]).removeClass('nav-item-active');
			}
		};
		function slider() {
			var height = $(".banner").innerHeight();
			$(".banner-list").css("top",-(height*index));
			if(index == $(".banner").length-1) {
				setTimeout(function(){
					$(".focus-arrow-list").css("display","none");
				},700)
			}else{
				setTimeout(function(){
					$(".focus-arrow-list").css("display","block");
				},700)
			}
			if(!index) {
				$(".nav").addClass("nav-active");
			}else{
				$(".nav-active").removeClass("nav-active");
			}
			switch (index){
				case 1:
					setTimeout(function(){
						$(".fourthly-page .outline-s").addClass('outline');
						$(".fourthly-page .outline-s").css("display","block")
					},500)
					break;
				case 2:
					if(brower_type != 'ie') {
						setTimeout(function(){
							second_page();
						},500)
					}
					break;
				case 3:
					setTimeout(function(){
						$(".thirdly-page-bg").addClass('thirdly-page-bg-s');
					},500)
					break;
			}
		}
		function status () {
			$(".nav-item-active").removeClass('nav-item-active');
			$(".focus-btn-active").removeClass('focus-btn-active');
			for(var i=0;i<$(".nav-item").length;i++) {
				if(index == i){
					$($(".nav-item")[i]).addClass('nav-item-active');
					$($(".focus-btn")[i]).addClass('focus-btn-active');
				}
			}
		}
		jQuery(function($) {
			var slider_status = true;
			$('.banner-list')
			.bind('mousewheel', function(event, delta) {
				if(!slider_status) {
					return false;
				}
				var dir = delta > 0 ? 'Up' : 'Down';
				if (dir == 'Up') {
					if(index > 0) {
						index--;
						slider();
						status();
					}
				} else {
					if(index < $(".focus-btn").length-1) {
						index++;
						slider();
						status();
					}
				}
				slider_status = false;
				setTimeout(function(){
					slider_status = true;
				},500);
				return false;
			});
		});
		//视频播放事件
		var myVideo = document.getElementById('video');
		myVideo.muted=true;
		myVideo.addEventListener("canplay",function() {
			setTimeout(function(){
				document.querySelector('.video-top-text').classList.add('video-top-text-an-z');
			},4000);
			setTimeout(function(){
				document.querySelector('.video-end-hold').classList.add('video-end-hold-in');
			},7000);
			setTimeout(function(){
				$('.video-txt-left').addClass('video-txt-show');
			},1000);
			
			$(document).keyup(function(event){
				if(event.keyCode == 38){
					up_slider();
					slider();
				}
				if(event.keyCode == 40){
					down_slider();
					slider();
				}
			});
		})

	//页面五
	$(function () {
	    if ($(".map-branch")) {
	        //默认显示上海
	        // $(".map-dot.shanghai").addClass("cur");
	        // $("#company_shanghai").show().css({
	        //     "left": $(".map-dot.shanghai").position().left + 36,
	        //     "top": $(".map-dot.shanghai").position().top - $("#company_shanghai").height() / 2 + 8
	        // });
	        $(".map-dot").on("mouseover", function () {
	            $(this).addClass("cur").siblings(".map-dot").removeClass("cur");
	        });
	        $(".map-dot").on("click", function () {
	            $(this).addClass("cur").siblings(".map-dot").removeClass("cur");
	            var dataid = $(this).attr("data-id")
	                , comp = $("#company_" + dataid)
	                , otherComp = $("#company_" + dataid).siblings(".branch-map-data");
	//          console.log($(this).position());
	            comp.fadeIn("fast").css({
	                "left": $(this).position().left + 36,
	                "top": $(this).position().top - comp.height() / 2 + 8
	                // "left": $(this).position().left - 160,
	                // "top": $(this).position().top - comp.height() / 2 - 120
	            });
	            otherComp.hide();
	        });
	        $(".branch-map-data").on("mouseleave", function () {
	            $(this).hide();
	            $(".map-dot").removeClass("cur");
	        });
	    }
	});
})
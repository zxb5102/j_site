$(function() {
	let height = $(".banner").innerHeight();
	let index = 0;
	$(".focus-list").on("click",".focus-btn",function(event) {
		$(".focus-btn").removeClass('focus-btn-active');
		let target = $(event.target);
		index = $(".focus-btn").index(this);
		target.addClass('focus-btn-active');
		slider();
		if(index == 1) {
			second_page();
		}
	});
	$(".focus-arrow-list").on("click",".focus-arrow",function(event) {
		let arrow_type = $(".focus-arrow").index(this);
		if(!arrow_type) {
			up_slider();
			slider();
		}else{
			down_slider();
			slider();
		}
	});
	function second_page() {
    	$('.cover-hand-move').css('display','none');
    	$('.container-hand-move-s').css('display','block');
    	$('.container-hand-move-s').addClass('container-hand-move');
    	$('.hold-hand-s').addClass('hold-hand');
	};
	function up_slider() {
		if(index > 0) {
			index--;
			$($(".focus-btn-active").prev()).addClass('focus-btn-active');
			let list = $(".focus-btn-active");
			$(list[1]).removeClass('focus-btn-active');
		}
	};
	function down_slider() {
		if(index < $(".focus-btn").length-1) {
			index++;
			$($(".focus-btn-active").next()).addClass('focus-btn-active');
			let list = $(".focus-btn-active");
			$(list[0]).removeClass('focus-btn-active');
		}
	};
	function slider() {
		let height = $(".banner").innerHeight();
		$(".banner-list").css("top",-(height*index));
		if(index == $(".banner").length-1) {
			setTimeout(()=>{
				$(".focus-arrow-list").css("display","none");
			},700)
		}else{
			setTimeout(()=>{
				$(".focus-arrow-list").css("display","block");
			},700)
		}
		if(!index) {
			$(".nav").addClass("nav-active");
		}else{
			$(".nav-active").removeClass("nav-active");
		}
		
		if(index == 1) {
			setTimeout(()=>{
				second_page();
			},500)
		}if(index == 2) {
			setTimeout(()=>{
				$(".thirdly-page-bg").addClass('thirdly-page-bg-s');
			},500)
		}
	}
	//视频播放事件
	let myVideo = document.getElementById('video');
	myVideo.oncanplay = function() {
		setTimeout(() => {
			$('.video-txt-left').addClass('video-txt-show');
		},1000);
		$(document).keydown(function(event){
			if(event.keyCode == 38){
				up_slider();
				slider();
			}
			if(event.keyCode == 40){
				down_slider();
				slider();
			}
		});
	}
});
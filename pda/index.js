var banner_index = 0,
	banner_top = 0,
	banner_height = $(".banners").height();
function top_nav() {
	$(".nav-top-btn").click(function(){
		$(".nav-btn").css("top","0")
	});
	$(".nav-btn-close").click(function(e){
		$(".nav-btn").css("top","100vh")
	});
	$(".nav-btn").on("click","div",function(e){
		$(".nav-btn").css("top","100vh")
		if($(this).data('id')) {
			banner_index = $(this).data('id');
		}
		banner_top = -(banner_index*banner_height);
		$(".banner-list").css("transition","top .5s");
		$(".banner-list").css("top",banner_top + "px");
		switch (banner_index){
			case 1:
				setTimeout(function(){
					second_page();
				},500)
				break;
			case 2:
				setTimeout(function(){
					third_page();
				},1000)
				break;
		}
	})
}

function first_page() {
    var stars = 800;
    var $stars = $('.stars');
    var r = 800;
    for (var i = 0; i < stars; i++) {
        if (window.CP.shouldStopExecution(1)) {
            break;
        }
        var $star = $('<div/>').addClass('star');
        $stars.append($star);
    }
    window.CP.exitedLoop(1);
    $('.star').each(function () {
        var cur = $(this);
        var s = 0.2 + Math.random() * 1;
        var curR = r + Math.random() * 300;
        cur.css({
            transformOrigin: '0 0 ' + curR + 'px',
            transform: ' translate3d(0,0,-' + curR + 'px) rotateY(' + Math.random() * 360 + 'deg) rotateX(' + Math.random() * -50 + 'deg) scale(' + s + ',' + s + ')'
        });
    });
}
function second_page() {
	$(".second-page-img").addClass("second-page-img-animation")
}
function third_page() {
	$(".third-page-txt").addClass("third-page-txt-show");
	$('.cover-hand-move').css('display', 'none');
	$('.container-hand-move-s').css('display', 'block');
	$('.container-hand-move-s').addClass('container-hand-move');
	$('.hold-hand-s').addClass('hold-hand');
}
function fourth_page() {
	var index = 0;
	function fourth_page_action() {
		$(".fourth-page-list").css("left","-" + index + "00vw");
		$(".fourth-page-item-txt").css("display","none");
		$($(".fourth-page-item-txt")[index]).css("display","block");
		$(".fourth-img-item").css("border-color","#fff")
		$($(".fourth-img-item")[index]).css("border-color","red")
	}
	$(".left-arrow").on('touchstart',function(event){
		if(index > 0) {
			index--;
			fourth_page_action();
		}
	});
	$(".right-arrow").on('touchstart',function(event){

		if(index < 3) {
			index++;
			fourth_page_action();
		}
	});
	$(".fourth-img-list").on("click",".fourth-img-item",function(e){
		index = e.target.innerHTML;
		fourth_page_action()
	});
}
function fifth_page() {
	$('.fifth-page-map').on('touchstart','.map-dot',function(e){
		$(".fifth-page-item").css("display","none");
		$(".company_" + e.target.classList[1]).css("display","block")
	})
}
function banner_slider() {
	var	top_list = 0,
		start = {},
		offset = {},
		item = document.getElementById('banner_slider');
	function close_slider() {
		item.removeEventListener("touchstart",touch_start);
		item.removeEventListener("touchmove",touch_move);
		item.removeEventListener("touchend",touch_end);
	}
	function open_slider() {
		item.addEventListener('touchstart',touch_start);
		item.addEventListener('touchmove',touch_move);
		item.addEventListener('touchend', touch_end);
	}
	function touch_start (event) {
       	if (event.targetTouches.length > 1) return;
        var touch = event.targetTouches[0];
    	top_list = parseInt($(".banner-list").css("top"));
        start = { x: touch.clientX, y: touch.clientY };
        $(".banner-list").css("transition","");
        
	}
	function touch_move (event) {
		if (event.targetTouches.length > 1) return;
		var touch = event.targetTouches[0];
		offset = { x: touch.clientX - start.x, y: touch.clientY - start.y };
		if(top_list >= 0 && offset.y > 0 ||top_list <= -5*banner_height && offset.y < 0) {
			console.log('return move')
			return false;
		}
		if(offset.y<50&&offset.y>0||offset.y<0&&offset.y>-50) {
			return false;
		}
		banner_top = top_list + offset.y;
		$(".banner-list").css("top",banner_top + "px");
	}

	function touch_end (event) {
		if (event.targetTouches.length > 1) return;
		close_slider();
		if(top_list >= 0 && offset.y > 0 ||top_list <= -5*banner_height && offset.y < 0) {
			open_slider()
			return false;
		}else {
			setTimeout(function(){
				open_slider()
			},500);
		}
		if(offset.y <= -50) {
			banner_top = top_list - banner_height;
			banner_index++
		}else if(offset.y >= 50) {
			banner_top = top_list + banner_height;
			banner_index--
		}else {
			banner_top = top_list;
		}
		switch (banner_index){
			case 1:
				setTimeout(function(){
					second_page();
				},500)
				break;
			case 2:
				setTimeout(function(){
					third_page();
				},1000)
				break;
		}

		$(".banner-list").css("top",banner_top + "px");
		$(".banner-list").css("transition","top .5s");
		offset = {};
	}

	item.addEventListener('touchstart', touch_start);
	item.addEventListener('touchmove',touch_move);
	item.addEventListener('touchend', touch_end);
}
$(document).ready(function () {
    first_page();
    fourth_page();
    fifth_page();
    banner_slider();
    top_nav()
});

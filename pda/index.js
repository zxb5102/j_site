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
		$(".nav-btn").css("top","100vh");
		if($(this).data('id')) {
			banner_index = $(this).data('id');
			bottom_nav_action(banner_index);
			slider(function(mySwiper){
				mySwiper.slideTo(banner_index, 1000, false);
			})
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
        s > 0.7?s=s-0.2:'';
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
	$(".fifth-page-list").css("top","60%");
	$('.fifth-page-map').on('click','.map-dot',function(e){
		$(".fifth-page-item").css("display","none");
		if($(".company_" + e.target.classList[1]).height()<=100) {
			$(".fifth-page-list").css("top","60%")
		}else{
			$(".fifth-page-list").css("top","40%")
		};
		$(".company_" + e.target.classList[1]).css("display","block");
		
		$(".company_" + e.target.classList[1]).addClass("flipInY animated")
	})
}
function bottom_nav_action(index) {
	switch (index){
		case 0:
			$("#ss_menu").css("display","block");
			$(".fa-qq").html("<a href='#'>企业简介</a>")
			$(".fa-weibo").html("<a href='#'>董事长致辞</a>")
			$(".fa-weixin").html("<a href='#'>企业理念</a>")
			$(".fa-renren").html("<a href='#'>大事记</a>")
			$(".fa-renren").parent().css("display","flex")
			break;
		case 1:
			second_page();
			$("#ss_menu").css("display","block");
			$(".fa-qq").html("<a href='#'>产业园官网</a>")
			$(".fa-weibo").html("<a href='#'>专业领域</a>")
			$(".fa-weixin").html("<a href='#'>入驻团队</a>")
			$(".fa-renren").html("")
			$(".fa-renren").parent().css("display","none")
			break;
		case 2:
			third_page();
			$("#ss_menu").css("display","block");
			$(".fa-qq").html("<a href='#'>企业荣誉</a>")
			$(".fa-weibo").html("<a href='#'>业务范围</a>")
			$(".fa-weixin").html("<a href='#'>精品工程</a>")
			$(".fa-renren").html("")
			$(".fa-renren").parent().css("display","none")
			break;
		case 3:
			$("#ss_menu").css("display","block");
			$(".fa-qq").html("<a href='#'>公司新闻</a>")
			$(".fa-weibo").html("<a href='#'>设计师精品</a>")
			$(".fa-weixin").html("<a href='#'>行业资讯</a>")
			$(".fa-renren").html("<a href='#'>创意装饰</a>")
			$(".fa-renren").parent().css("display","flex")
			break;
		case 4:
			$("#ss_menu").css("display","none");
			break;
		case 5:
			$("#ss_menu").css("display","none");
			break;
	}
}
function slider (callback) {
	var mySwiper = new Swiper ('.swiper-container', {
    	direction: 'vertical',
		on: {
		    transitionEnd: function(swiper){
				bottom_nav_action(this.activeIndex)
		    }
		}
  	});
	if(typeof callback == "function") {
	  	callback(mySwiper);
	}
}
var toggle = $('#ss_toggle');
var menu = $('#ss_menu');
var rot;
function bottom_nav() {
    $('#ss_toggle').on('click', function (ev) {
        rot = parseInt($(this).data('rot')) - 180;
        menu.css('transform', 'rotate(' + rot + 'deg)');
        menu.css('webkitTransform', 'rotate(' + rot + 'deg)');
       	if(rot / 180 % 2 == 0) {
       		$("#ss_toggle div").css('transform', 'rotate(' + (rot - 45) + 'deg)');
       	}else {
       		$("#ss_toggle div").css('transform', 'rotate(' + rot + 'deg)');
       	}
        $(this).data('rot', rot);
    });
}
$(document).ready(function () {
    first_page();
    fourth_page();
    fifth_page();
	slider();
    top_nav();
	bottom_nav();
});

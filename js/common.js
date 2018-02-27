// JavaScript Document

/********************************************************************************************************
 * 전역 함수모음
*********************************************************************************************************/

$(function(){

	/* =======================================================
	  Default Setting
	=========================================================== */

	/********** 페이지 로딩 **********/
	document.getElementById('loading_page').style.display="none";
	document.getElementById('wrap').style.display="";

	/********** selectbox CSS 적용 **********/
    $('.ui.dropdown')
    .dropdown();

	/********** SCROLL TOP 함수 스크립트 **********/
	$(window).scroll(function() {
		if ($(this).scrollTop()) {
			$('#toTop').fadeIn();
		} else {
			$('#toTop').fadeOut();
		}
	});

    /********** semantic-ui Using **********/
    //FooTable
    $('.table').footable();
    $('.ui.dropdown').dropdown();
    $('.ui.checkbox').checkbox();
    //$('.ui.rating').rating();

    /********** semantic.button event **********/
//    var $buttons = $('.ui.buttons .button');
//    handler = {
//        activate: function() {
//            $(this)
//            .addClass('active')
//            .siblings()
//            .removeClass('active');
//        }
//    };
//    $buttons.on('click', handler.activate);

    var $toggle  = $('.클래스');
    $toggle.state({
        text: {
            inactive : '적용',
            active   : '미적용'
        }
    });

    $('.toggle-use')
    .checkbox({
        onChecked: function() {
            $("label[for='"+$(this).attr("id")+"']").text('사용');
        },
        onUnchecked: function() {
            $("label[for='"+$(this).attr("id")+"']").text('미사용');
        }
    });

    $('.toggle-allow')
    .checkbox({
        onChecked: function() {
            $("label[for='"+$(this).attr("id")+"']").text('허용');
        },
        onUnchecked: function() {
            $("label[for='"+$(this).attr("id")+"']").text('미허용');
        }
    });

    $('.toggle-open')
    .checkbox({
        onChecked: function() {
            $("label[for='"+$(this).attr("id")+"']").text('공개');
        },
        onUnchecked: function() {
            $("label[for='"+$(this).attr("id")+"']").text('비공개');
        }
    });


    /********** semantic simple-uploader **********/
    $('input:text, .ui.button', '.simple-uploader').on('click', function(e) {
        $('.simple-uploader input:file', $(e.target).parents()).click();
    });

    $('input:file', '.simple-uploader').on('change', function(e) {
        var name = e.target.files[0].name;
        $('input:text', $(e.target).parent()).val(name);
    });


	$(window).resize(function(event){
		controller();
	});
	controller();
 });



function controller(){
	var winWidth = $(window).width();
	if ( winWidth >= 1217 ) {

		/****************************
		 * PC 화면 이벤트
		 ****************************/

	}else if ( winWidth >= 481 ) {

		/****************************
		 * TABLET 화면 이벤트
		 ****************************/

	}else{

		/****************************
		 * MOBILE 화면 이벤트
		 ****************************/

	}
};



$(document).ready(function () {
    "use strict";

    if ($('body').hasClass('left-side-collapsed')) {
        $(".left-side").hide();
    }

    var oHeight = $(window).height();
    $('.main-content').css({
        'minHeight': oHeight
    });
    $('.question_list .question_list_con').css({
        'minHeight': oHeight - 130
    });
    $('.user_center').css({
        'minHeight': oHeight - 70
    });
    $('.user_center .main_content').css({
        'minHeight': oHeight - 70
    });

    $('.menu-list > a').click(function () {
        var body = $('body');
        var bodyposition = body.css('position');

        if (bodyposition == 'relative') {
            if (body.hasClass('left-side-show'))
                body.removeClass('left-side-show');
            else
                body.addClass('left-side-show');
            mainContentHeightAdjust();
        }
    });

    $('.sub-menu-list > li > a').click(function () {
        var body = $('body');
        var bodyposition = body.css('position');

        if (bodyposition == 'relative') {
            if (body.hasClass('left-side-show'))
                body.removeClass('left-side-show');
            else
                body.addClass('left-side-show');
            mainContentHeightAdjust();
        }
    });

    function visibleSubMenuClose() {
        $('.menu-list').each(function () {
            var t = $(this);
            if (t.hasClass('nav-active')) {
                t.find('> ul').slideUp(200, function () {
                    t.removeClass('nav-active');
                });
            }
        });
    }

    function mainContentHeightAdjust() {
        // Adjust main content height
        var docHeight = $(document).height();
        if (docHeight > $('.main-content').height()) {
            $('.main-content').height(docHeight);
        }
    }

    //  class add mouse hover
    $('.custom-nav > li').hover(function () {
        $(this).addClass('nav-hover');
    }, function () {
        $(this).removeClass('nav-hover');
    });

    // Menu Toggle
    $('.toggle-btn').click(function () {
        $(".left-side").hide();
        if ($('body').hasClass('left-side-collapsed')) {
            $(".left-side").show();
        }
        var body = $('body');
        var bodyposition = body.css('position');

        if (bodyposition != 'relative') {
            if (!body.hasClass('left-side-collapsed')) {
                body.addClass('left-side-collapsed');
                $('.custom-nav ul').attr('style', '');

                $(this).addClass('menu-collapsed');
            } else {
                body.removeClass('left-side-collapsed chat-view');
                $('.custom-nav li.active ul').css({display: 'block'});

                $(this).removeClass('menu-collapsed');
            }
        } else {
            if (body.hasClass('left-side-show')) {
                body.removeClass('left-side-show');
                $(".left-side").hide();
            } else {
                body.addClass('left-side-show');
                $(".left-side").show();
            }
            mainContentHeightAdjust();
        }
    });

    // 点击显示修改昵称弹出框
    $('.change_name_btn').on('click', function () {
        $('#change_name_pop').modal('show')
    });

    // 点击显示修改头像弹出框
    $('.change_avatar_btn').on('click', function () {
        $('#change_avatar_pop').modal('show')
    });

    //点击绑定微信弹出框
    $('.bind_weixin_btn').on('click', function () {
        var url = "/get_wx_bind_url";
        var param = {current: window.location.href, css: 'weixin_bind'};
        $.post(url, param, function (data) {
            $("#weixin_bind_iframe").attr('src', data);
            $('#bind_weixin_pop').modal('show');
        }, 'json');
    });

    //点击显示"必须先绑定账号"弹出框
    $(".must_bind_account").on('click', function () {
        $('#must_bind_account_pop').modal('show');
    });

    //点击显示解除微信绑定弹出框
    $(".un_bind_weixin_btn").on('click', function () {
        $('#un_bind_account_pop').modal('show');
    });

    //点击绑定账号弹出框
    $(".bind_account_btn").on('click', function () {
        $('#bind_account_pop').modal('show');
    });

    // 点击显示修改密码弹出框
    $('.change_password_btn').on('click', function () {
        $('#change_password_pop').modal('show')
    });

    $(window).on('resize', function () {
        if ($('body').css('position') == 'relative') {
            $('.left-side').hide();
            $('body').removeClass('left-side-collapsed');
        } else {
            $('body').css({left: '', marginRight: ''});
            $('.left-side').show();
        }
        resizeOnePage();
    });

    $('.menu_toggle_btn').on('click', function() {
        $('.layout').addClass('menu_open');
        if($(this).parents('.header-section').hasClass('index_header')){
            return;
        }else{
            $(this).parents('.header-section').hide();
        }
        $('.content_header').show();
        $('.main_content').css({
            'margin-top': '0'
        });
    });

    $('.content_overlay').on('click', function () {
        $('.layout').removeClass('menu_open');
        $('.header-section').show();
        $('.content_header').hide();
        $('.main_content').css({
            'margin-top': '50px'
        });
    });

    // 点击提问按钮显示提问弹出框
    $('.ask_btn').on('click', function () {
        $('.ask_question_pop').animate({
            'top': 0
        }, 300);
        $('.ask_pop_title').animate({
            'top': 0
        }, 300);
        $('.ask_question_pop_flyer').show();
    });

    $('.ask_question_pop_flyer').on('click', function () {
        $('.ask_question_pop').animate({
            'top': '100%'
        }, 300);
        $('.ask_pop_title').animate({
            'top': '100%'
        }, 300);
        $(this).hide();
    });

    // 取消提问
    $('.cancle_ask_btn').on('click', function () {
        $('.ask_question_pop').animate({
            'top': '100%'
        }, 300);
        $('.ask_pop_title').animate({
            'top': '100%'
        }, 300);
        initAskPop();
        $('.ask_question_pop_flyer').hide();
    });

    // 初始化提问弹出框
    function initAskPop() {
        $('.ask_pop_content input').val('');
        $('.ask_pop_content textarea').val('');
        $('.tag_list a').removeClass('curr');
    }

    // 判断是否在iframe内，调整固定位置内容是否展示
    if (top.location != location) {
        $('.header-section').css({
            'display': 'none'
        });
        $('.fixed_ask_question').css({
            'display': 'none'
        });
        $('.main_content').css({
            'marginTop': 0
        })
    }

    // 点击快速预览现实预览弹出框
    $('.show_preview a').on('click', function (e) {
        $('.show_preview a').removeAttr('style');
        $('.show_preview a').removeAttr('class');
        var btn = $(this);
        var href = btn.parents('.course_info').find('h3').find('a').attr('href');
        $('.preview_pop').find('iframe').attr({'src': href});
        $('.preview_pop iframe').bind('load', function () {
            $('.preview_pop').slideDown(300);
            $('.show_preview a[class^=preview]').addClass('open_preview');
        });

        var screenWidth = $(window).width();
        var screenHeight = $(window).height();

        var pageX = btn.offset().left;
        var pageY = btn.offset().top;
        var pageRightX = screenWidth - pageX - btn.width();
        var pageBottomY = screenHeight - pageY - btn.height();

        var leftArea = Math.floor(pageX * screenHeight);
        var rightArea = Math.floor(pageRightX * screenHeight);
        var topArea = Math.floor(pageY * screenWidth);
        var bottomArea = Math.floor(pageBottomY * screenWidth);

        var arr = [leftArea, rightArea, topArea, bottomArea];
        var maxArea = arr.sort(function (n1, n2) {
            return n1 - n2;
        })[3];

        if (maxArea == leftArea) {
            var width = pageX > 930 ? 900 : (pageX - 34);
            $('.preview_pop').css({
                'top': '50%',
                'left': pageX > 930 ? ((pageX - 914) + 'px') : '20px',
                'width': width,
                'height': width * 2 / 3,
                'marginTop': -width / 3 + 'px',
                'marginLeft': 0
            });
            btn.addClass('preview_left');
        } else if (maxArea == rightArea) {
            var width = pageRightX > 930 ? 900 : (pageRightX - 34);
            $('.preview_pop').css({
                'right': pageRightX > 930 ? ((pageRightX - 914) + 'px') : '20px',
                'width': width + 'px',
                'height': width * 2 / 3 + 'px',
                'top': '50%',
                'marginTop': -width / 3 + 'px',
                'marginLeft': 0
            });
            btn.addClass('preview_right');
        } else if (maxArea == topArea) {
            var height = pageY > 630 ? 600 : (pageY - 30);
            $('.preview_pop').css({
                'left': '50%',
                'width': height * 3 / 2 + 'px',
                'height': height + 'px',
                'top': pageY > 630 ? ((pageY - 614) + 'px') : '20px',
                'marginTop': 0,
                'marginLeft': -height * 3 / 4 + 'px'
            });
            btn.addClass('preview_top');
        } else if (maxArea == bottomArea) {
            var height = pageBottomY > 630 ? 600 : (pageBottomY - 30);
            $('.preview_pop').css({
                'left': '50%',
                'width': height * 3 / 2,
                'height': height,
                'bottom': pageBottomY > 630 ? ((pageBottomY - 614) + 'px') : '20px',
                'marginTop': 0,
                'marginLeft': -height * 3 / 4 + 'px'
            });
            btn.addClass('preview_bottom');
        }
    });

    // 关闭预览弹出框
    function closeIframe() {
        $('.preview_pop').slideUp(300);
        $('.show_preview a').removeAttr('style');
        $('.show_preview a').removeAttr('class');
        $('.preview_pop').removeAttr('style');
        $('.preview_pop iframe').unbind('load')
        $('.preview_pop iframe').attr({'src': ''});
        return false;
    }

    // 点击关闭按钮预览弹出框关闭
    $('.close_iframe').on('click', function () {
        closeIframe();
    });

    // 滚动页面隐藏预览弹出框
    $('.main_warpper').scroll(function () {
        if ($('.preview_pop:visible').length == 1) {
            closeIframe();
        } else {
            return;
        }
    });

    // 顶部导航搜索功能
    $('.nav_search_btn').on('click', function () {
        var form = $(this).parents('.course_search');
        var $input = $('.nav_search_txt');
        if (form.hasClass('open')) {
            if ($input.val() == '') {
                form.removeClass('open');
            } else {
                // 执行搜索
            }
        } else {
            form.addClass('open');
        }
    });

    //js 设置cookie
    function setCookie(name, value) {
        document.cookie=name+"="+escape(value);
    }
    //js 获取cookie
    function getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    //自适应一页元素个数
    function resizeOnePage(){
        var screenWidth = $(window).width();
        var num = 12;
        if (screenWidth >= 1500) {
            num = 12;
        } else if (screenWidth >= 1240 && screenWidth <= 1499) {
            num = 10;
        } else if (screenWidth >= 1024 && screenWidth <= 1239) {
            num = 12;
        } else if (screenWidth >= 707 && screenWidth <= 1023) {
            num = 12;
        } else if (screenWidth >= 540 && screenWidth <= 706) {
            num = 12;
        } else if (screenWidth <= 539) {
            num = 12;
        }
        var cookieNum = getCookie("screen_page_num");
        if(cookieNum == null || num != cookieNum){
            setCookie("screen_page_num", num);
        }
    }
    //页面加载时计算页面元素
    resizeOnePage();
});
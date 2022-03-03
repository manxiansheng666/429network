/**
  * Retina Logos
  * Header Fixed
  * mobileNav
  * Mobile Navigation
  * ajaxContactForm
  * PreLoad
  * Scroll to Top  
*/

;(function($) {
    "use strict";

    // Scroll Top
    var scrollToTop = function() {
        $(window).scroll(function() {
            if ( $(this).scrollTop() > 300 ) {
                $('#scroll-top').addClass('show');
            } else {
                $('#scroll-top').removeClass('show');
            }
        });

        $('#scroll-top').on('click', function() {
            $('html, body').animate({ scrollTop: 0 } , 'easeInOutExpo');
        return false;
        });
    }

    // PreLoad
    var Preloader = function () {
        setTimeout(function() {  
            $("#loading-overlay").fadeOut('slow',function(){
                $(this).remove(); 
            });
        }, 1000);
    };

    // Header Fixed
    var headerFixed = function() {
        if ( $('body').hasClass('header-fixed') ) {
            var nav = $('#site-header');

            if ( nav.length ) {
                var offsetTop = nav.offset().top,
                    headerHeight = nav.height(),
                    injectSpace = $('<div />', {
                        height: headerHeight
                    }).insertAfter(nav);
                    injectSpace.hide();

                    $(window).on('load scroll', function(){
                        if ( $(window).scrollTop() > offsetTop ) {
                            nav.addClass('is-fixed');
                            injectSpace.show();
                        } else {
                            nav.removeClass('is-fixed');
                            injectSpace.hide();
                        }

                        if ( $(window).scrollTop() > 0 ) { 
                            nav.addClass('is-small');
                        } else {
                            nav.removeClass('is-small');
                        }
                    })
            }
        }     
    };

    // Mobile Navigation
    var mobileNav = function() {
        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var mode = 'desktop';
            var wrapMenu = $('#site-header .nav-wrap');
            var navExtw = $('.nav-extend.active');
            var navExt = $('.nav-extend.active').children();

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches )
                mode = 'mobile';

            if ( mode != menuType ) {
                menuType = mode;

                if ( mode === 'mobile' ) {
                    $('#mainnav').attr('id', 'mainnav-mobi')
                        .appendTo('#site-header')
                        .hide().children('.menu').append(navExt)
                            .find('li:has(ul)')
                            .children('ul')
                                .removeAttr('style')
                                .hide()
                                .before('<span class="btn-submenu"></span>');
                } else {

                    $('#mainnav-mobi').attr('id', 'mainnav')
                        .removeAttr('style')
                        .prependTo(wrapMenu)
                        .find('.ext').appendTo(navExtw)
                        .parent().siblings('#mainnav')
                        .find('.sub-menu')
                            .removeAttr('style')
                        .prev().remove();
            
                    $('.btn-menu').removeClass('active');
                    $(".sub-menu").css({ display: "block" });
                    $(".btn-submenu").css({ display: "none" });

                }
            }
        });

        $('.btn-menu').on('click', function() {         
            $('#mainnav-mobi').slideToggle(300);
            $(this).toggleClass('active');
        });
        
        $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
            $(this).toggleClass('active').next('ul').slideToggle(300);
            e.stopImmediatePropagation();
        });
    };

    var ajaxContactForm = function() {  
        $('#commentform').each(function() {
            $(this).validate({
                submitHandler: function( form ) {
                    var $form = $(form),
                        str = $form.serialize(),
                        loading = $('<div />', { 'class': 'loading' });

                    $.ajax({
                        type: "POST",
                        url:  $form.attr('action'),
                        data: str,
                        beforeSend: function () {
                            $form.find('comment-form').append(loading);
                        },
                        success: function( msg ) {
                            var result, cls;                            
                            if ( msg === 'Success' ) {                                
                                result = 'Message Sent Successfully To Email Administrator. ( You can change the email management a very easy way to get the message of customers in the user manual )';
                                cls = 'msg-success';
                            } else {
                                result = 'Error sending email.';
                                cls = 'msg-error';
                            }

                            $form.prepend(
                                $('<div />', {
                                    'class': 'flat-alert ' + cls,
                                    'text' : result
                                }).append(
                                    $('<a class="close" href="#"><i class="fas fa-times"></i></a>')
                                )
                            );

                            $form.find(':input').not('.submit').val('');
                        },
                        complete: function (xhr, status, error_thrown) {
                            $form.find('.loading').remove();
                        }
                    });
                }
            });
        }); // each contactform
    };

    var flatSpacer = function() {
        $(window).on('load resize', function(){
            var mode = 'desktop';
            if(matchMedia('only screen and (max-width: 991px)').matches) 
                mode = 'mobile';
            if(matchMedia('only screen and (max-width: 767px)').matches)
                mode = 'smobile';
            $('.themesflat-spacer').each( function(){
                if( mode === 'desktop'){
                    $(this).attr('style','height:' + $(this).data('desktop') + 'px')
                }else if( mode === 'mobile') {
                    $(this).attr('style','height:' + $(this).data('mobile') + 'px')
                }else {
                    $(this).attr('style','height:' + $(this).data('smobile') + 'px')
                }
            });
        });
    };

    var retinaLogos = function() {
        var retina = window.devicePixelRatio > 1 ? true : false;
          if(retina) {
              $('.logo').find('img').attr( {src:'assets/image/logo@2x.png'} );    
          }
      };

    $(function() {
        $( window ).on('load resize',function() {
            retinaLogos();
        });
        flatSpacer();
        scrollToTop();
        Preloader ();
        headerFixed();
        mobileNav();
        ajaxContactForm();
    });

})(jQuery);
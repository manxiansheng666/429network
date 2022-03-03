/**
  * flatSpacer
  * Parallax
  * flatOwlCarowsel
  * flatIsotopeCase
  * flatCounter
  * popupVideo
*/

;(function($) {

    "use strict";

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var Parallax = function() {
        if ( $().parallax && isMobile.any() == null ) {
            $('.parallax-1').parallax("50%", 0.1);
            $('.parallax-3').parallax("50%", 0.1);
            $('.parallax-4').parallax("50%", 0.1);          
        }
    };

    var flatOwlCarowsel = function() {
        if ( $().owlCarousel ) {
            $('.themesflat-carousel').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                item = $this.data("item"),
                item2 = $this.data("item2"),
                item3 = $this.data("item3"),
                margin = Number($this.data("margin"));

                $this.find('.owl-carousel').owlCarousel({
                    margin: margin,
                    navigation : false,
                    pagination: false,
                    autoplay: auto,
                    loop:true,
                    nav: false,
                    dots: true,
                    dotsData: true,
                    animateOut:'fadeOut',
                    autoplayTimeout: 10000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };
    
    var flatIsotopeCase = function() {
        $(".fl-isotope").each(function () {
            if ( $().isotope ) {           
                var $container = $('.isotope-gl');
                $('.flat-filter-isotope li').on('click',function() {                           
                    var selector = $(this).find("a").attr('data-filter');
                    $('.flat-filter-isotope li').removeClass('active');
                    $(this).addClass('active');
                    $container.isotope({ filter: selector });
                    return false;
                });
            };
        });         
    };

    var flatCounter = function() {
        if ($(document.body).hasClass('counter-scroll')) {
            var a = 0;
                $(window).scroll(function() {
                var oTop = $('.themesflat-counter').offset().top - window.innerHeight;
                    if (a === 0 && $(window).scrollTop() > oTop) {
                        if ( $().countTo ) {
                            $('.themesflat-counter').find('.number').each(function() {
                                var to = $(this).data('to'),
                                    speed = $(this).data('speed');
                              
                                $(this).countTo({
                                    to: to,
                                    speed: speed
                                });
                            });
                        }
                    a = 1;
                }
            });
        }
    };

    var popupVideo = function () {
        if ($().magnificPopup) {
            $('.popup-video').magnificPopup({
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        }
    }

    var popupfeature = function () {
        if ($().magnificPopup) {
        $(".popup-feature").magnificPopup({
            type: "image",
            tLoading: "Loading image #%curr%...",
            removalDelay: 600,
            mainClass: "my-mfp-slide-bottom",
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [ 0, 1 ]
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
            }
        });
        }
    } 

    // Dom Ready
    $(function() {
        flatCounter();
        flatIsotopeCase();
        popupVideo();
        popupfeature();
        flatOwlCarowsel();
        $( window ).on('load',function() {
            Parallax();
        });
    });

})(jQuery);


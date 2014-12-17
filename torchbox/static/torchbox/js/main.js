$(function() {
    var $window = $(window);

    // Scroll all anchor links
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    // Menu toggle
    $(".menu-button").click(function() {
        $('nav ul').toggleClass('visible');
    });

    // Share hide
    $(".share a").click(function() {
        $('.share ul').toggleClass('visible');
    });
    

    // Dropdown menus for mobile
    $('.dropdown').click(function() {
        $('.dropdown').toggleClass('open');
        $('.popular-tags .closed').slideToggle();
    });
    var querystring = window.location.search;
    if ((querystring.indexOf('tag') > 0) && ($('.dropdown').css('display') == 'block')) {
        $('.dropdown').addClass('open');
        $('.popular-tags .closed').slideToggle();
    }

    // Sticky elements
    $('.pick').each(function(){
        var $stickyEl = $('.pick');
        var elTop = $stickyEl.length && $stickyEl.offset().top - 4;
        
        $stickyEl.toggleClass('fixed', $window.scrollTop() > elTop);

        $window.scroll(function() {
            $stickyEl.toggleClass('fixed', $window.scrollTop() > elTop);
        });
    });

    $('.nextprev').each(function(){
        var $stickyEl = $('.nextprev');
        var elTop = $stickyEl.length && $stickyEl.offset().top - 10;
        
        $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);

        $window.scroll(function() {
            $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
        });
    });

    // fitVids
    $('.responsive-object').fitVids();
    
    // get some stats about the video
    $('.responsive-object').each(function() {
        var $this = $(this);
        var iframe = $('iframe', $this)[0];
        var player = $f(iframe);

        $('.poster, .play', $this).click(function(){
            player.api('play');
        });

        player.addEvent('ready', function() {  
            player.addEvent('play', function(id){
                $('header, .hero-video h1').animate({
                    opacity: 0,
                }, 500, function() {});
                $('.poster, .play').fadeOut(500);
                ga('send', 'event', 'video', 'played', id);
            }); 
            player.addEvent('pause', function(id){
                $('header').animate({
                    opacity: 1,
                }, 500, function() {});
                ga('send', 'event', 'video', 'paused', id);
            });     
            player.addEvent('finish', function(id){
                 $('header').animate({
                    opacity: 1,
                }, 500, function() {});
                $('.poster').fadeIn(500);
                ga('send', 'event', 'video', 'finished', id);
            });
        });
    });
});
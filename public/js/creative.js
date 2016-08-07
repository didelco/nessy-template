
$( document ).ready(function() {
    console.log( "ready!" );
    var alto = Math.floor(3* $("header").width() /4);
    $("header").height(alto);

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    function reloadImg(){
    var imageSource = 'img/last.jpg?'+Math.floor(100000*Math.random());
    $(".webcam").css('background-image', 'url(' + imageSource + ')');
    setTimeout(reloadImg, 1234);

};

//reloadImg();
});



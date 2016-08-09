
$( document ).ready(function() {
    console.log( "ready!" );

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });



    function reloadImg(){
        var imageSource = 'img/last.jpg?'+Math.floor(100000*Math.random());
        $(".webcam").css('background-image', 'url(' + imageSource + ')');
        setTimeout(reloadImg, 1234);

    };

    function resizeSite(){
        var alto = Math.floor(3* $("header").width() /4);
        $("header").height(alto);

        var anchos = $("#datalog .container").width();
        console.log(anchos);
        if(anchos > 1139){
            console.log(">1139");
            ancho = (anchos/4)-40;
        } else if( anchos > 520){
            console.log(">520");
            ancho = (anchos/2)-40;
        } else {
            console.log("pequeño");
            ancho = anchos-40;
            console.log(ancho);
        }
        $('.service-box').width(ancho);
    }

    $( window ).resize(function() {
      resizeSite();
  });
//reloadImg();
resizeSite();
});



$('.sertificate-list').slick({
  infinite: false,
  slidesToShow: 6,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        infinite: true
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2
      }
    }    
  ]
});

$('.work-list').slick({
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1
});

$('.footer-list').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1
});


var $page = $('html, body');
$('a[href*="#"]').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    return false;
});



  



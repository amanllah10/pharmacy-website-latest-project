// Initialize AOS
AOS.init();

// Select buttons and sliders
let buttons = document.querySelectorAll('button');
let slider1 = document.querySelector('.slider1');
let slider2 = document.querySelector('.slider2');
let slider1H2 = document.querySelectorAll('.slider1-h2s');

// Button click event
buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        let product = btn.parentElement;
        let image = product.querySelector('img').src;
        let title = product.querySelector('h2').innerHTML;
        let alt = product.querySelector('img').alt;

        localStorage.setItem('productimage', image);
        localStorage.setItem('producttitle', title);
        localStorage.setItem('productalt', alt);

        console.log('Alt:', alt);
        location.href = 'pharmacy-website/buypage.html';

    });
});

// Hero slider
$(".slider").slick({
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000
});

// Slider2 initialization
$(".slider2").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    infinite: true,
    speed: 300,
    arrows: true,
    cssEase: 'linear'
});

// Function to initialize slider1 based on screen width
function initSlider1() {
    if ($(window).width() <= 600) {
        // Mobile view: destroy if exists, then init with 1 slide
        if ($('.slider1').hasClass('slick-initialized')) {
            $('.slider1').slick('unslick');
        }
        $('.slider1').slick({
            infinite: true,
            speed: 2000,
            autoplay: true,
            autoplaySpeed: 0,
            cssEase: "linear",
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            pauseOnHover: false,
            pauseOnFocus: false
        });
        slider1.style.height = 'auto';
    } else {
        // Desktop: init with 3 slides if not already initialized
        if (!$('.slider1').hasClass('slick-initialized')) {
            $('.slider1').slick({
                infinite: true,
                speed: 2000,
                autoplay: true,
                autoplaySpeed: 0,
                cssEase: "linear",
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                pauseOnHover: false,
                pauseOnFocus: false
            });
        }
    }
}

// Initialize on DOM load and window resize
$(document).ready(function () {
    initSlider1();
    $(window).resize(initSlider1);
});

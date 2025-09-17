'use strict';
document.addEventListener("DOMContentLoaded", () => {

    var swiperNews = new Swiper(".mySwiperNews", {
        slidesPerView: 3,
        grid: {
            rows: 2,
        },
        spaceBetween: 30,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });


    var swiperpag = new Swiper(".mySwiperPag", {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });

    var swiperbig = new Swiper(".mySwiperbig", {
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiperpag,
      },
    });

});
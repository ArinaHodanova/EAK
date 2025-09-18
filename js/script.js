'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const dropdownItems = document.querySelectorAll('.nav__item');

    function updateActiveStates() {
        dropdownItems.forEach(item => {
            const dropdownLink = item.querySelector('.nav__link--dropdown');
            const dropdown = item.querySelector('.dropdown');

            if (dropdownLink && dropdown) {
                const isDisplayBlock = dropdown.style.display === 'block';
                if (isDisplayBlock) {
                    dropdownLink.classList.add('active');
                } else {
                    dropdownLink.classList.remove('active');
                }
            }
        });
    }

    updateActiveStates();

    dropdownItems.forEach(item => {
        const dropdownLink = item.querySelector('.nav__link--dropdown');
        const dropdown = item.querySelector('.dropdown');

        if (dropdownLink && dropdown) {
            item.addEventListener('mouseenter', function() {
                dropdown.style.display = 'block';
                updateActiveStates();
            });

            item.addEventListener('mouseleave', function() {
                setTimeout(() => {
                    if (!item.matches(':hover')) {
                        dropdown.style.display = 'none';
                        updateActiveStates();
                    }
                }, 100);
            });

            dropdownLink.addEventListener('click', function(e) {
                e.preventDefault();

                dropdownItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherDropdown = otherItem.querySelector('.dropdown');
                        if (otherDropdown) {
                            otherDropdown.style.display = 'none';
                        }
                    }
                });

                if (dropdown.style.display === 'block') {
                    dropdown.style.display = 'none';
                } else {
                    dropdown.style.display = 'block';
                }
                        
                updateActiveStates();
            });
        }
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav__item')) {
            dropdownItems.forEach(item => {
                const dropdown = item.querySelector('.dropdown');
                if (dropdown) {
                    dropdown.style.display = 'none';
                }
            });
            updateActiveStates();
        }
    });

    const observer = new MutationObserver(function(mutations) {
        let needsUpdate = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                needsUpdate = true;
            }
        });
        if (needsUpdate) {
            updateActiveStates();
        }
    });

    dropdownItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown');
        if (dropdown) {
            observer.observe(dropdown, { attributes: true, attributeFilter: ['style'] });
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {

    function updateMainBgFromActiveSlide() {
        const activeSlide = document.querySelector('.mySwiperbig .swiper-slide-active');
        const mainBg = document.querySelector('.section-main__bg');
    
        if (activeSlide && mainBg) {
            const activeSlideBg = activeSlide.querySelector('[data-big-bg]');
            if (activeSlideBg) {
                const bgImage = activeSlideBg.style.backgroundImage;
                mainBg.style.backgroundImage = bgImage;
            }
        }
    }

    // Функция для инициализации всех слайдеров
    function initializeSliders() {
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
                nextEl: ".swiper-button-next-big",
                prevEl: ".swiper-button-prev-big",
            },
            thumbs: {
                swiper: swiperpag,
            },
            on: {
                init: function() {
                    updateMainBgFromActiveSlide();
                },
                slideChange: function() {
                    updateMainBgFromActiveSlide();
                }
            }
        });

        // Возвращаем объекты слайдеров для возможного дальнейшего использования
        return {
            news: swiperNews,
            pagination: swiperpag,
            main: swiperbig
        };
    }

    const sliders = initializeSliders();

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('swiper-slide') && target.closest('.mySwiperbig')) {
                    updateMainBgFromActiveSlide();
                }
            }
        });
    });

    document.querySelectorAll('.mySwiperbig .swiper-slide').forEach(slide => {
        observer.observe(slide, {
            attributes: true,
            attributeFilter: ['class']
        });
    });
  
});
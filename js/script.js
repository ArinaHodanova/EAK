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

    // Инициализация слайдеров
    function initializeSliders() {
        var swiperNews = new Swiper(".mySwiperNews", {
            slidesPerView: 3,
            spaceBetween: 10,
            grid: {
                rows: 2,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });

        var swiperNew = new Swiper(".mySwiperNew", {
            slidesPerView: 4,
            spaceBetween: 50,
            breakpoints: {
                320: {
                    slidesPerView: 1.3,
                    spaceBetween: 10,
                },
                576: {
                    slidesPerView: 2.3,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 3.3,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                },
            }
        });


        var swiperpag = new Swiper(".mySwiperPag", {
            loop: true,
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
            autoplay: {
                delay: 40000,
                disableOnInteraction: false,
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 4,
                },
            },
            on: {
                autoplayTimeLeft(s, time, progress) {
                    s.slides.forEach(slide => {
                        let bar = slide.querySelector('.progress-bar');
                        if (bar) {
                            bar.style.width = "0%";
                        }
                    });
            
                    let activeSlide = s.el.querySelector('.swiper-slide-thumb-active');
                    if (activeSlide) {
                        let progressBar = activeSlide.querySelector('.progress-bar');
                        if (progressBar) {
                            const newWidth = `${(1 - progress) * 100}%`;
                            progressBar.style.width = newWidth;
                        }
                    }
                },
                slideChangeTransitionStart(s) {
                    s.autoplay.stop();
            
                    s.slides.forEach(slide => {
                        let bar = slide.querySelector('.progress-bar');
                        if (bar) {
                            bar.style.width = "0%";
                            bar.style.transition = 'none';
                        }
                    });
                },
                slideChangeTransitionEnd(s) {
                    setTimeout(() => {
                        s.slides.forEach(slide => {
                            let bar = slide.querySelector('.progress-bar');
                            if (bar) {
                                bar.style.transition = '';
                            }
                        });
                
                        s.autoplay.start();
                    }, 50);
                }
            }
        });

        var swiperbig = new Swiper(".mySwiperbig", {
            loop: true,
            freeMode: true,
            watchSlidesProgress: true,
            navigation: {
                nextEl: ".swiper-button-next-big",
                prevEl: ".swiper-button-prev-big",
            },
            autoplay: {
                delay: 40000,
                disableOnInteraction: false,
            },
            thumbs: {
                swiper: swiperpag,
            },
            on: {
                init: function() {
                    updateMainBgFromActiveSlide();
                },
                slideChange: function(s) {
                    updateMainBgFromActiveSlide();

                    if (swiperpag && swiperpag.autoplay) {
                        swiperpag.autoplay.stop();
                
                        swiperpag.slides.forEach(slide => {
                            let bar = slide.querySelector('.progress-bar');
                            if (bar) {
                                bar.style.width = "0%";
                                bar.style.transition = 'none';
                            }
                        });
                
                        setTimeout(() => {
                            swiperpag.slides.forEach(slide => {
                                let bar = slide.querySelector('.progress-bar');
                                if (bar) {
                                    bar.style.transition = '';
                                }
                            });
                            swiperpag.autoplay.start();
                        }, 50);
                    }
                }
            }

        });

        return {
            news: swiperNews,
            new: swiperNew,
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

document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const dropdownTriggers = document.querySelectorAll('.nav__link--mob-dropdown');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', toggleMenu);
        menuBtn.addEventListener('touchend', toggleMenu);
    
        function toggleMenu(e) {
            e.preventDefault();
            menuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('hide-scroll');
        }
    }

    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Находим соответствующий dropdown
            const dropdown = this.nextElementSibling;
            
            // Переключаем класс active у trigger
            this.classList.toggle('active');
            
            // Переключаем класс active у dropdown
            if (dropdown && dropdown.classList.contains('mob-dropdown')) {
                dropdown.classList.toggle('active');
            }
        });
    });
});
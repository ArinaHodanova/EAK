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
                //e.preventDefault();

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
        var swiperPartners = new Swiper(".mySwiperPartners", {   
            slidesPerView: 3,
            spaceBetween: 10,
            grid: {
                rows: 2,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 2,
                    grid: {
                        rows: 3,
                    },
                },
                786: {
                    slidesPerView: 2,
                    grid: {
                        rows: 2,
                    },
                },
                992: {
                    slidesPerView: 3,
                    grid: {
                        rows: 2,
                    },
                }
            }
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


        var swiperDetail = new Swiper(".mySwiperNewDetail", { 
            slidesPerView: 4,
            spaceBetween: 50,
            navigation: {
                nextEl: ".swiper-button-next-detail",
                prevEl: ".swiper-button-prev-detail",
            },
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
                delay: 400000,
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
                delay: 400000,
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
            partners: swiperPartners,
            new: swiperNew,
            detail: swiperDetail,
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

// 1. Обработка полей ввода - добавление класса active
function handleInputFields() {
    const inputFields = document.querySelectorAll('.field-input1 input, .field-input1 textarea');
    
    inputFields.forEach(input => {
        const fieldContainer = input.closest('.field-input1');
        
        // Добавляем класс active при фокусе и вводе текста
        input.addEventListener('focus', () => {
            fieldContainer.classList.add('active');
        });
        
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                fieldContainer.classList.add('active');
            } else {
                fieldContainer.classList.remove('active');
            }
        });
        
        // Убираем класс active при потере фокуса, если поле пустое
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                fieldContainer.classList.remove('active');
            }
        });
        
        // Проверяем начальное состояние поля
        if (input.value.trim() !== '') {
            fieldContainer.classList.add('active');
        }
    });
}

// 2. Обработка выпадающего списка
function handleDropdownSelect() {
    const dropdownSelects = document.querySelectorAll('[data-select]');
    
    dropdownSelects.forEach(dropdown => {
        const button = dropdown.querySelector('.filter-select__button');
        const options = dropdown.querySelectorAll('.filter-select__option');
        const hiddenInput = dropdown.querySelector('input[type="hidden"]');
        const fieldContainer = dropdown.closest('.field-input1');
        
        // Функция для обновления состояния активности поля
        function updateFieldActiveState() {
            if (fieldContainer) {
                // Проверяем, есть ли выбранный элемент (не пустое значение в data-selected)
                const selectedValue = button.getAttribute('data-selected');
                const isActive = dropdown.classList.contains('filter-select--active');
                
                if (isActive || (selectedValue && selectedValue.trim() !== '')) {
                    fieldContainer.classList.add('active');
                } else {
                    fieldContainer.classList.remove('active');
                }
            }
        }
        
        // Клик по кнопке - открытие/закрытие dropdown
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Закрываем все другие открытые dropdown
            document.querySelectorAll('[data-select]').forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('filter-select--active');
                    // Обновляем состояние других полей
                    const otherFieldContainer = otherDropdown.closest('.field-input1');
                    if (otherFieldContainer) {
                        const otherButton = otherDropdown.querySelector('.filter-select__button');
                        const otherSelectedValue = otherButton.getAttribute('data-selected');
                        if (!otherSelectedValue || otherSelectedValue.trim() === '') {
                            otherFieldContainer.classList.remove('active');
                        }
                    }
                }
            });
            
            // Переключаем состояние текущего dropdown
            dropdown.classList.toggle('filter-select--active');
            
            // Обновляем состояние поля
            updateFieldActiveState();
        });
        
        // Обработка выбора опции
        options.forEach(option => {
            option.addEventListener('click', () => {
                const optionText = option.textContent.trim();
                const optionValue = option.getAttribute('value');
                
                // Обновляем текст и атрибуты кнопки
                button.textContent = optionText;
                button.setAttribute('value', optionText);
                button.setAttribute('data-selected', optionText);
                
                // Обновляем скрытый input
                if (hiddenInput) {
                    hiddenInput.value = optionValue;
                }
                
                // Закрываем dropdown
                dropdown.classList.remove('filter-select--active');
                
                // Обновляем состояние поля
                updateFieldActiveState();
            });
        });
        
        // Проверяем начальное состояние
        updateFieldActiveState();
    });
    
    // Закрытие dropdown при клике вне его области
    document.addEventListener('click', (e) => {
        if (!e.target.closest('[data-select]')) {
            document.querySelectorAll('[data-select]').forEach(dropdown => {
                dropdown.classList.remove('filter-select--active');
                
                // Обновляем состояние поля при закрытии
                const fieldContainer = dropdown.closest('.field-input1');
                if (fieldContainer) {
                    const button = dropdown.querySelector('.filter-select__button');
                    const selectedValue = button.getAttribute('data-selected');
                    if (!selectedValue || selectedValue.trim() === '') {
                        fieldContainer.classList.remove('active');
                    }
                }
            });
        }
    });
    
    // Закрытие dropdown при нажатии Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('[data-select]').forEach(dropdown => {
                dropdown.classList.remove('filter-select--active');
                
                // Обновляем состояние поля при закрытии
                const fieldContainer = dropdown.closest('.field-input1');
                if (fieldContainer) {
                    const button = dropdown.querySelector('.filter-select__button');
                    const selectedValue = button.getAttribute('data-selected');
                    if (!selectedValue || selectedValue.trim() === '') {
                        fieldContainer.classList.remove('active');
                    }
                }
            });
        }
    });
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    handleInputFields();
    handleDropdownSelect();
});

// Если нужно инициализировать для динамически добавленных элементов
function initializeFormElements() {
    handleInputFields();
    handleDropdownSelect();
}
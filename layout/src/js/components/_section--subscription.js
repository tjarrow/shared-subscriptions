document.addEventListener('DOMContentLoaded', function () {
  const subscribeSliderEl = document.querySelector('.section--subscription .swiper-container');

  if (subscribeSliderEl) {

    let subscribeSlider = null;
    let subscribeSliderType = null;

    const sliderConf = {
      loop: true,
      centeredSlides: true,
      slidesPerView: 1.2,
      spaceBetween: 15,
      watchSlidesVisibility: true,
      pagination: {
        el: '.slider__pagination',
        clickable: true,
        bulletElement: 'button',
        bulletClass: 'slider__bullet',
        bulletActiveClass: 'slider__bullet--active',
      },
      navigation: {
        nextEl: '.slider__navbutton--next',
        prevEl: '.slider__navbutton--prev',
        disabledClass: 'slider__navbutton--disabled'
      },
      breakpoints: {
        500: {
          slidesPerView: 1.6
        },
        666: {
          slidesPerView: 2
        },
        800: {
          slidesPerView: 2.8
        },
        1070: {
          slidesPerView: 3,
          spaceBetween: 24
        },
        1300: {
          slidesPerView: 4
        }
      }
    }

    function subscribeSliderInit() {
      if (window.innerWidth >= 1070 && subscribeSliderType != 'desktop') {
        sliderConf.loop = false;
        sliderConf.centeredSlides = false;
        if (subscribeSlider) subscribeSlider.destroy()
        subscribeSlider = new Swiper(subscribeSliderEl, sliderConf);
        subscribeSliderType = 'desktop';
      }
      if (window.innerWidth < 1070 && subscribeSliderType != 'mobile') {
        sliderConf.loop = true;
        sliderConf.centeredSlides = true;
        if (subscribeSlider) subscribeSlider.destroy()
        subscribeSlider = new Swiper(subscribeSliderEl, sliderConf);
        subscribeSliderType = 'mobile';
      }
    }

    subscribeSliderInit();

    window.addEventListener('resize', throttle(subscribeSliderInit, 100));
  }
})

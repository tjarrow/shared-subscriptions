document.addEventListener('DOMContentLoaded', function () {

  // Photo menu
  const showPhotoMenuButton = document.querySelector('.js-show-photo-menu');
  if (showPhotoMenuButton) {
    const photoMenu = document.querySelector('.menu--user-photo');
    showPhotoMenuButton.addEventListener('click', () => {
      photoMenu.classList.add('menu--user-photo-opened');
    })
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.menu--user-photo') && !e.target.closest('.js-show-photo-menu')) {
        photoMenu.classList.remove('menu--user-photo-opened');
      }
    })
  }

  // Page slider
  var slider = document.querySelector('.page-slider');
  var tabs = document.querySelectorAll('*[data-row]');
  var currentSlide = 1;
  var slideH = [];

  if (slider && tabs) {
    initSlider();
    for (var t = 0; t < tabs.length; t++) {
      tabs[t].addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.classList.contains('tabs__link')) {
          clearActiveClass(tabs, 'tabs__link--active');
          e.target.classList.add('tabs__link--active');
        }
        slider.classList.remove('page-slider--slide-' + currentSlide);
        slider.classList.add('page-slider--slide-' + e.target.dataset.row)
        currentSlide = e.target.dataset.row;
        slider.style.height = slideH[currentSlide - 1].offsetHeight + 'px';
      })
    }
  }

  function setSliderHeight() {
    slider.style.height = slideH[currentSlide - 1].offsetHeight + 'px';
  }

  window.addEventListener('resize', throttle(setSliderHeight, 50));
  window.addEventListener('orientationchange', throttle(setSliderHeight, 50));

  function clearActiveClass(elements, className) {
    if (!elements) return;
    for (var t = 0; t < elements.length; t++) {
      elements[t].classList.remove(className)
    }
  }

  function initSlider() {
    setTimeout(function () {
      var slides = slider.children;
      for (var s = 0; s < slides.length; s++) {
        slideH.push(slides[s]);
      }

      slider.style.height = slideH[currentSlide - 1] + 'px';
    }, 300)
  }
});

document.addEventListener('DOMContentLoaded', function () {

  // Open/close menu
  const toggle = document.querySelector('.menu__toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (toggle) {
    toggle.addEventListener('click', () => {
      // Show user menu
      if (window.innerWidth >= 992) {
        document.querySelector('.user-menu').classList.toggle('user-menu--opened');
        document.querySelector('.user-menu .menu').classList.toggle('menu--user-menu-opened');
      }
      // Show mobile menu
      else {
        mobileMenu.classList.add('mobile-menu--opening');

        setBodyOverflowHidden();

        setTimeout(() => {
          mobileMenu.classList.add('mobile-menu--opened');
          mobileMenu.classList.remove('mobile-menu--opening');
        }, 100);
      }
    })
  }

  document.querySelectorAll('.mobile-menu__close, .mobile-menu__backdrop').forEach((elem) => {
    elem.addEventListener('click', () => {
      mobileMenu.classList.add('mobile-menu--opening');
      mobileMenu.classList.remove('mobile-menu--opened');
      setTimeout(() => {
        mobileMenu.classList.remove('mobile-menu--opening');
      }, 200);
      removeBodyOverflowHidden();
    })
  });
})


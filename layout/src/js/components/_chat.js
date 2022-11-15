document.addEventListener('DOMContentLoaded', function () {
  const footer = document.querySelector('.footer');
  const chat = document.querySelector('.chat');

  function chatPosition() {
    if (window.innerHeight + window.scrollY > footer.offsetTop) {
      chat.classList.add('chat--footer-fixed');
      chat.style.top = footer.offsetTop + 30 + 'px';
    }
    else {
      chat.classList.remove('chat--footer-fixed');
      chat.style.top = '';
    }
  }

  document.addEventListener('scroll', throttle(chatPosition, 100));

  // Show success message
  document.querySelector('.modal--chat form').addEventListener('submit', (e)=>{
    e.preventDefault();
    document.querySelector('.modal--chat').classList.remove('modal--show', 'modal--shown');
    document.body.classList.remove('overflow-hidden');
    document.body.style.paddingRight = '';
    document.querySelector('.chat__success-message').classList.add('chat__success-message--show');

    setTimeout(() => {
      document.querySelector('.chat__success-message').classList.remove('chat__success-message--show');
    }, 2000);

    return false;
  })
});

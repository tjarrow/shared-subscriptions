document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');

  // Trasparent header scroll
  function headerWatcher() {
    const headerPosition = window.pageYOffset / 200;
    // Add shadow
		if(headerPosition > 0.4) {
			header.classList.add('header--shadow');
		}
		else {
			header.classList.remove('header--shadow');
		}
    // Calc bg opacity
    const headerBgOpacity = (headerPosition > 1) ? 1 : headerPosition;
    header.style.background = `hsla(0, 0%, 100%, ${headerBgOpacity})`;
    setTimeout(() => {
      requestAnimationFrame(headerWatcher)
    }, 10);
  }
  if (!header.classList.contains('header--white')) {
    headerWatcher();
  }
});

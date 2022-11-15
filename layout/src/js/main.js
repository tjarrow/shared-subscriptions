//= ../../node_modules/swiper/swiper-bundle.min.js

//= components/_header.js
//= components/_subscription-card.js
//= components/_chat.js
//= components/_section--subscription.js
//= components/_menu.js
//= components/_modal.js
//= components/_form-group.js
//= components/_profile.js

function setBodyOverflowHidden() {
	const scrollbarWidth = (window.innerWidth - document.documentElement.clientWidth);
	// Add scrollbar padding
	document.body.classList.add('overflow-hidden');
	document.body.style.paddingRight = scrollbarWidth + 'px';
	document.querySelector('.header').style.paddingRight = scrollbarWidth + 'px';
  document.querySelector('.chat').style.right = 34 + scrollbarWidth + 'px';
}

function removeBodyOverflowHidden() {
	document.body.classList.remove('overflow-hidden');
	document.body.style.paddingRight = '';
	document.querySelector('.header').style.paddingRight = '';
	document.querySelector('.chat').style.right = '';
}

function throttle(fn, wait) {
	var time = Date.now();
	return function () {
		if ((time + wait - Date.now()) < 0) {
			fn();
			time = Date.now();
		}
	}
}

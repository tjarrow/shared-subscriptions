document.addEventListener('DOMContentLoaded', function () {
  const subscriptionCardList = document.querySelectorAll('.subscription-card');
  if (subscriptionCardList) {
    subscriptionCardList.forEach((card) => {
      const tabList = card.querySelectorAll('.subscription-card__tab');
      const contentList = card.querySelectorAll('.subscription-card__content');

      tabList.forEach((tab) => {
        tab.addEventListener('click', () => {
          if (!tab.classList.contains('subscription-card__tab--active')) {
            card.querySelector('.subscription-card__tab--active').classList.remove('subscription-card__tab--active');
            card.querySelector('.subscription-card__content--active').classList.remove('subscription-card__content--active');
            tab.classList.add('subscription-card__tab--active');
            card.querySelector(`.subscription-card__content--${tab.dataset.content}`).classList.add('subscription-card__content--active');
          }
        })
      })
    })
  }
});

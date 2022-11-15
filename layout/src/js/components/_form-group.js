document.addEventListener('DOMContentLoaded', function () {
  // Form inputs
  document.querySelectorAll('.form-group').forEach((group) => {
    const input = group.querySelector('.form-group__input, .form-group__textarea');
    input.addEventListener('focus', () => {
      group.classList.add('form-group--show-label');
    })
    input.addEventListener('blur', () => {
      if (!input.value.trim()) {
        group.classList.remove('form-group--show-label');
      }
    })
  })
});

var logoWrapper = document.querySelector('.page-header__logo-wrapper');
var menu = document.querySelector('.page-header__menu');

menu.classList.remove('page-header__menu--nojs');
logoWrapper.classList.remove('page-header__logo-wrapper--nojs');

logoWrapper.addEventListener('click', function() {
  if (menu.classList.contains('page-header__menu--close')) {
    logoWrapper.classList.remove('page-header__logo-wrapper--close');
    menu.classList.remove('page-header__menu--close');
    logoWrapper.classList.add('page-header__logo-wrapper--open');
    menu.classList.add('page-header__menu--open');
  } else {
    menu.classList.add('page-header__menu--close');
    logoWrapper.classList.add('page-header__logo-wrapper--close');
    menu.classList.remove('page-header__menu--open');
    logoWrapper.classList.remove('page-header__logo-wrapper--open');
  }
});

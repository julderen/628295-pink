var menuToggle = document.querySelector('.page-header__toggle-button');
var menu = document.querySelector('.page-header__menu');

menu.classList.remove('page-header__menu--nojs');
menuToggle.classList.remove('page-header__toggle-button--nojs');

menuToggle.addEventListener('click', function() {
  if (menu.classList.contains('page-header__menu--close')) {
    menuToggle.classList.remove('page-header__toggle-button--close');
    menu.classList.remove('page-header__menu--close');
    menuToggle.classList.add('page-header__toggle-button--open');
    menu.classList.add('page-header__menu--open');
  } else {
    menu.classList.add('page-header__menu--close');
    menuToggle.classList.add('page-header__toggle-button--close');
    menu.classList.remove('page-header__menu--open');
    menuToggle.classList.remove('page-header__toggle-button--open');
  }
});

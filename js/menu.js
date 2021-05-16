//variable
var menu = document.querySelector('.menu')
var menu_mask = document.querySelector('.menu-mask')
var menu_buttons = document.querySelectorAll('.menu-button, .menu .title, .menu-mask')
var menu_button = document.querySelector('.menu-button')
var body = document.body
var resize = '0px';

//code
menu_buttons.forEach(function (button) {button.addEventListener('click', function () {menu_button.classList.contains('toggle') ? menu_button.classList.remove('toggle') : menu_button.classList.add('toggle')})})

function resize_menu () {
    resize = window.innerHeight + 'px';
    menu.style.height = resize
    menu_mask.style.height = resize
}

resize_menu()

body.onresize = throttle(resize_menu, 50)
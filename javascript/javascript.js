let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let searchIcon = document.querySelector('#search-icon');
let searchBox = document.querySelector('.search-box');
let userIcon = document.querySelector('#user-icon');
let user = document.querySelector('.user');
let closeIcon = document.querySelector('#close-icon');
let shopping = document.querySelector('#shopping');



userIcon.onclick = () => {
    userIcon.classList.toggle('fa-times');
    user.classList.toggle('active');
}
closeIcon.onclick = () => {
    userIcon.classList.toggle('fa-times');
    user.classList.toggle('active');
}

searchIcon.onclick = () => {
    searchIcon.classList.toggle('fa-times');
    searchBox.classList.toggle('active');
}
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.addEventListener('click', () => {
    cart.classList.add('active');
});
closeCart.addEventListener('click', () => {
    cart.classList.remove('active');
});
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}

function start() {
    addEvents();
}

function update(){
    addEvents();
    updateTotal();
}

function addEvents() {
    let cartRemove = document.querySelectorAll('.fa-cart-remove');
    for (let i = 0; i < cartRemove.length; i++) {
        cartRemove[i].addEventListener('click', () => {
            cartRemove[i].parentElement.remove();
            update();
        });
    }
    let cartQuantity = document.querySelectorAll('.cart-quantity');
    for (let i = 0; i < cartQuantity.length; i++) {
        cartQuantity[i].addEventListener('change', () => {
            update();
        });
    }
    let addCart = document.querySelectorAll('.add-cart');
    addCart.forEach((btn) => {
        btn.addEventListener('click', handle_addCartItem);
    });
}
function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1){
    this.value = 1;
}
this.value = Math.floor(this.value);
update();
}

function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector('.product-title').innerHTML;
    let price = product.querySelector('.product-price').innerHTML;
    let imgSrc = product.querySelector('.product-img').src;
    console.log(title, price, imgSrc);

    let newToAdd = {
         title,
         price,
         imgSrc,
    };

    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement('div');
    newNode.innerHTML = cartBoxElement;
    const cartContent = document.querySelector('.cart-content');
    cartContent.appendChild(newNode);

    update();
}
function updateTotal() {
    let cartBoxes = document.querySelectorAll('.cart-box');
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let priceElement = cartBoxes[i].querySelector('.cart-price');
        let price = parseFloat(priceElement.textContent.replace('$', ''));
        let quantity = cartBoxes[i].querySelector('.cart-quantity').value;
        total += price * quantity;
    }

    document.querySelector('.total-price').textContent = '$' + total.toFixed(2);
}

import axios from 'axios';

let cartCounter = document.getElementById('cartCounter');
let addToCart = document.querySelectorAll('.add-to-cart');
addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let icecream = JSON.parse(btn.dataset.icecream);
        updateCart(icecream)
    })
})

function updateCart(icecream){
    axios.post('/update-cart',icecream)
    .then( res => {
        cartCounter.innerText = res.data.totalQty;
    })
}
import axios from 'axios';
import Noty from 'noty';

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
        new Noty({
            type: 'success',
            text: 'Item added to cart',
            timeout: 900
        }).show();
    })
    .catch((err) => {
        new Noty({
            type: 'error',
            text: 'Something went wrong',
            timeout: 900
        }).show();
    })
}

const alertMsg = document.getElementById('success-alert');
if(alertMsg){
    setTimeout(() => {
        alertMsg.remove()
    },2000)
}
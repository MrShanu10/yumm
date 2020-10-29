const express = require('express');
const ejs = require('ejs');
const ejsLayout = require('express-ejs-layouts');
const path = require('path');

const app = express();


app.use(express.static('public'))
app.use(ejsLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.render('homepage');
})

app.get('/cart', (req,res) => {
    res.render('customers/cart')
})

app.get('/login',(req,res) => {
    res.render('auth/login')
})

app.get('/register',(req,res) => {
    res.render('auth/register')
})
app.listen(process.env.PORT || 8000 , () =>{
    console.log("Server started!!!")
})
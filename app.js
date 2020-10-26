const express = require('express');
const ejs = require('ejs');
const ejsLayout = require('express-ejs-layouts');
const path = require('path');

const app = express();

app.get('/',(req,res) => {
    res.render('homepage');
})

app.use(ejsLayout);
app.set('views',path.join(__dirname,'/resources/views'));
console.log(path.join(__dirname,'/resources/views'))
app.set('view engine','ejs');


app.listen(process.env.PORT || 8000 , () =>{
    console.log("Server started!!!")
})
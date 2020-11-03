const express = require('express');
const ejs = require('ejs');
const ejsLayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const flash = require('express-flash');
const { MongoStore } = require('connect-mongo');
const MongodbStore = require('connect-mongo')(session);
const url='mongodb+srv://Shivendra:shivendra@cluster0.keeq1.mongodb.net/yumm?retryWrites=true&w=majority';
mongoose.connect(url, 
    {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true, 
        useFindAndModify: true
    })
    .then(() => {
        console.log('Database Connected');
    })
    .catch((error) => {
        console.log(error.message);
    })

    const mongoStore = new MongodbStore({
        mongooseConnection: mongoose.connection,
        collection: 'sessions'
    })
const app = express();

app.use(flash());
app.use(express.urlencoded({ extended: false}))
app.use(express.json());
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //24 hours
    }
}))

// Passport Config
const passportInit = require('./app/config/passport')
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

//Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next();
})
app.use(express.static('public'))
app.use(ejsLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');

require('./routes/web')(app);

app.listen(process.env.PORT || 8000 , () =>{
    console.log("Server started at PORT 8000!!!")
})
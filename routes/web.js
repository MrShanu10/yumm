const homepageController = require('../app/http/controllers/homepageController');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const guest = require('../app/http/middlewares/guest'); 

function initRoutes(app) {
    app.get('/', homepageController().index);
    app.get('/cart', cartController().cart);
    app.post('/update-cart', cartController().update);
    app.get('/login', guest, authController().login);
    app.get('/register', guest, authController().register);
    app.post('/register', authController().userRegistration);
    app.post('/login', authController().userLogin)
    app.post('/logout', authController().userLogout);
}

module.exports = initRoutes;
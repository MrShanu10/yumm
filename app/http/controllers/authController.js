const User = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

function authController(){
    return{
        login: function(req,res){
            res.render('auth/login');
        },
        register: function(req,res){
            res.render('auth/register');
        },
        userRegistration: async function(req, res){
            const {name, email, password} = req.body;
            if(!name || !email || !password){
                req.flash('error', 'All fileds are required');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            }

            User.exists( {email: email}, (error, result) => {
                if(result){
                    req.flash('error', 'Email already exist');
                    req.flash('name', name);
                    req.flash('email', email);
                    return res.redirect('/register'); 
                }
            })

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            })
            user.save()
            .then((user) => {
                // 
                return res.redirect('/');
            })
            .catch((error) => {
                req.flash('error', 'Something went wrong');
                return res.redirect('/register');
            })
            console.log(req.body);
        },
        userLogin: function(req, res, next){
            passport.authenticate('local', (error, user, info) => {
                if(error){
                    req.flash('error', info.message);
                    return next(error);
                }
                if(!user){
                    req.flash('error', info.message);
                    return res.redirect('/login');
                }
                req.login(user, (error) => {
                    if(error){
                        req.flash('error', info.message);
                        return next(error);
                    }

                    return res.redirect('/')
                })
            })(req, res, next);
        },
        userLogout: function(req, res){
            req.logout();
            return res.redirect('/');
        }
    }
}

module.exports = authController;
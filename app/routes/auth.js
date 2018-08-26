var authController = require('../controllers/authcontroller.js');
var path = require("path");
var db = require('../models');
var User = db.user;       



module.exports = function(app, passport) {

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/index.html"));
    });

    app.get("/home", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/home.html"));
    });

    app.get("/login/profile", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/login-profile.html"));
    });

    app.get("/login/products", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/login-products.html"));
    });

    app.get("/login/fail", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/login-fail.html"));
    });
    
    app.get("/register/fail", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/register-fail.html"));
    });

    app.get("/register/success", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/register-success.html"));
    });

    app.get("/logout/success", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/logout-success.html"));
    });

    app.get("/logout/not", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/not-logged-in.html"));
    });

    app.get("/api/user", function(req, res) {

        console.log(req.user.email);
        
        let email = req.user.email;

        User.findOne({
            where: {
              email: email
            }
        }).then(function(dbUsers) {
              res.json(dbUsers);
        });
        
    });
 
    app.post('/signup', passport.authenticate('local-signup', {

            successRedirect: '/register/success',
 
            failureRedirect: '/register/fail'
        }
 
    ));
 
    app.get('/logout', isNotLoggedIn, authController.logout);

    app.get('/profile', isLoggedInProfile, authController.profile);

    app.get('/products', isLoggedInProducts, authController.products)

    app.post('/signin', passport.authenticate('local-signin', {

            successRedirect: '/home',
    
            failureRedirect: '/login/fail'
            
        }
 
    ));

    function isLoggedInProfile(req, res, next) {
 
        if (req.isAuthenticated())
         
            return next();
             
        res.redirect('/login/profile');
     
    };

    function isLoggedInProducts(req, res, next) {
 
        if (req.isAuthenticated())
         
            return next();
             
        res.redirect('/login/products');
     
    };

    function isNotLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
         
            return next();
             
        res.redirect('/logout/not');
     
    }

}
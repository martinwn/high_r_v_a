var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();

var sequelize = require('sequelize-heroku').connect(require('sequelize'));

if (sequelize) {
    sequelize.authenticate().then( function() {
        var config = sequelize.connectionManager.config;
        console.log('sequelize-heroku: Connected to '+config.host+' as '+config.username+'.');
        
        sequelize.query('SELECT 1+1 as test').then( function(res) {
            console.log('1+1='+res[0][0].test);
        });
        
    }).catch( function(err) {
        var config = sequelize.connectionManager.config;
        console.log('Sequelize: Error connecting '+config.host+' as '+config.user+': '+err);
    });
} else {
    console.log('No environnement variable found.');
}

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./app/views"));

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Models
var models = require("./app/models");

//Routes
var authRoute = require('./app/routes/auth.js')(app,passport);

//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);
 
//Sync Database
models.sequelize.sync().then(function() {

    app.listen(5000, function(err) {
        if (!err)
            console.log("Site is live");
        else console.log(err)
    });
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});
 
 


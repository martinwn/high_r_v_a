var path = require("path");

var exports = module.exports = {}
 
exports.profile = function(req, res) {

    res.sendFile(path.join(__dirname, "../views/profile.html"));
 
}

exports.products = function(req, res) {
 
    res.sendFile(path.join(__dirname, "../views/products.html"));
 
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/logout/success');
 
    });
 
}


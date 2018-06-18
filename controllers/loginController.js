var User = require('../models/user');

// Display user create form on GET.
exports.login_get = function (request, response) {
    console.log("GET request for the login page");
    response.render('login.ejs', {
        title: 'Login'
    });
};

// Handle login on POST.
exports.login_post = function (request, response) {
    console.log("POST request for the login page");
    //TODO TEM QUE DE FATO FAZER O LOGIN
    response.redirect('/');
};
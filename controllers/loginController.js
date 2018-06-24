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

    userObject = User.where({username : request.body.username});
    
    userObject.findOne(function (err, userObject) {
        if (err){
            console.log("Erro ao encontrar usuario no banco");
            return handleError(err);
        }
        console.log(userObject.email);
        //return response.status(200).send(userObject);

        if (!userObject) {
            console.log("Usuario inexistente no banco");
            response.redirect('/login');
        } else if (!userObject.validPassword(request.body.password)) {
            console.log("Senha invalida");
            response.redirect('/login');
        } else {
            request.session.user = userObject.dataValues;
            response.redirect('/');
        }
        
    });

};

//Handle user logout on GET
exports.user_logout_get = function(request,response){
    if (request.session.user && request.cookies.user_id) {
        response.clearCookie('user_id');
        response.redirect('/login');
    } else {
        response.redirect('/');
    }
};
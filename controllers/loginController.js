var User = require('../models/user');

// Display user create form on GET.
exports.login_get = function (request, response) {
    console.log("GET request for the login page");
    if(request.session.user){
        response.redirect('/');
    }else{
        response.render('login.ejs', {
            title: 'Login'
        });
    }
};

// Handle login on POST.
exports.login_post = function (request, response) {
    console.log("POST request for the login page");
    if(request.session.user){
        response.redirect('/');
    }else{
        var username = request.body.username;
        var password = request.body.password;

        User.findOne({username: username},function(err,user){
            if(err){
                console.log("Erro ao encontrar usuario no banco");
                return response.status(500).send();
            }

            if(!user){
                console.log("Usuario inexistente no banco");
                return response.status(401).send();
            } else if (!user.validPassword(request.body.password)) {
                console.log("Senha invalida");
                return response.status(401).send();
            } else {
                request.session.user = user;
                console.log("Logged in");
                response.status(200).send();
            }
        });
    }

};

//Handle user logout on GET
exports.user_logout_get = function(request,response){
    response.clearCookie('user_id');
    request.session.destroy();
    console.log("Logged out");
    response.redirect('/login');
    return response.status(200).send();
};
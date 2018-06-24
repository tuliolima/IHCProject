var User = require('../models/user');

// Display user create form on GET.
exports.user_create_get = function (req, res) {
    console.log("GET request for the sign up page");
    res.render('signup.ejs', {
        title: 'SignUp'
    });
};

// Handle user create on POST.
exports.user_create_post = function (req, res) {
    console.log("POST request for the sign up page");
    if(request.session.user){
        response.redirect('/');
    }else{
        var data = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        });
        
        data.save(function (error) {
            if (error) {
                console.log('Usuário não cadastrado: %s', error.message);
            } else {
                console.log('Usuário cadastrado com sucesso');
            }
        });
    }
};

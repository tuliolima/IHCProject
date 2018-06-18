var User = require('../models/user');

// Display user create form on GET.
exports.user_create_get = function (request, response) {
    console.log("GET request for the sign up page");
    response.render('signup.ejs', {
        title: 'SignUp'
    });
};

// Handle user create on POST.
exports.user_create_post = function (req, res) {
    console.log("POST request for the sign up page");
    var item = {
        name: req.body.name,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender,
        handicap: req.body.handicap,
        profession: req.body.profession,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        interests: req.body.interests,
        events: req.body.events
    };

    var data = new User(item);
    data.save(function(error) {
        if(error){
            console.log('Usuário não cadastrado: %s', error.message);
        }else{
            console.log('Usuário cadastrado com sucesso');
        }
    });

    res.redirect('/');
};

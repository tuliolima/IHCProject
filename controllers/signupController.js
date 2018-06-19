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
    //res.end(JSON.stringify(req.body));
    //console.log(req.body.name);
   // var item = {
       // name: req.body.name,
        //date_of_birth: req.body.date_of_birth,
        //gender: req.body.gender,
        //handicap: req.body.handicap,
        //profession: req.body.profession,
      //  email: req.body.email,
      //  password: req.body.password,
      //  username: req.body.username
        //interests: req.body.interests,
        //events: req.body.events
    //};
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.username);
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

    res.redirect('/');
};

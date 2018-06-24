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
    if(req.session.user){
        res.redirect('/');
    }else{
        var data = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            events: req.body.events
        });
        
        data.save(function (error) {
            if (error) {
                console.log('Usuário não cadastrado: %s', error.message);
                res.status(500).send();
            } else {
                console.log('Usuário cadastrado com sucesso');
                req.session.user = data;
                res.status(200).send();
            }
        });
    }
};


exports.user_update_post = function (req, res) {
    console.log("POST request for user update");
    if(req.session.user){
        res.redirect('/');
    }else{
        var id = req.body.id;  
  
        Event.findById(id, function(err, doc) {
            if(err){
                console.log("Erro ao encontrar usuario no banco");
                return response.status(500).send();
            }
            doc.name = req.body.name,
            doc.email = req.body.email,
            doc.password = req.body.password,
            doc.username = req.body.username,
            doc.events = req.body.events
            doc.save();  
        });
        console.log("Usuario atualizado");
        res.status(200).send(); 
    }
}
var User = require('../models/user');

// Display list of all users.
// exports.user_list = function(req, res) {
//     res.send('NOT IMPLEMENTED: user list');
// };

// Display detail page for a specific user.
// exports.user_detail = function(req, res) {
//     res.send('NOT IMPLEMENTED: user detail: ' + req.params.id);
// };

// Display user create form on GET.
exports.user_create_get = function(req, res) {
    res.render('/signup');
};

// Handle user create on POST.
exports.user_create_post = function(req, res) {
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
      data.save();  
       
      res.redirect('/');
};

// Display user delete form on GET.
// exports.user_delete_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: user delete GET');
// };

// // Handle user delete on POST.
// exports.user_delete_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: user delete POST');
// };

// Display user update form on GET.
// exports.user_update_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: user update GET');
// };

// // Handle user update on POST.
// exports.user_update_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: user update POST');
// };
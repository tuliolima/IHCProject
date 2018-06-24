var express = require("express");
var router = express.Router();

var home_controller = require('../controllers/index');
var users_controller = require('../controllers/signupController');
var login_controller = require('../controllers/loginController');



// Middleware function to check for logged-in users
sessionChecker = function(request, response, next){
    if (request.session.user && request.cookies.user_id) {
        response.redirect('/');
    } else {
        response.redirect('/login');
    }
};

// Home router

//Route to home page
router.get('/', home_controller.home_page_get);

//Event routers: create event
router.post('/event/create', home_controller.home_page_event_post);

// ----- LOGIN ROUTER -----
//Route to login page
router.get('/login', login_controller.login_get);
router.post('/login/signin', login_controller.login_post);

// ----- SIGNUP ROUTER -----
// GET request for creating user. NOTE This must come before route for id (i.e. display user).
router.get('/signup', users_controller.user_create_get);
// POST request for creating user.
router.post('/signup/create', users_controller.user_create_post);

// ----- LOGOUT ROUTER -----
// route for user logout
router.get('/logout', login_controller.user_logout_get);

module.exports = router;
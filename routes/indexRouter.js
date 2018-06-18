var express = require("express");
var router = express.Router();

var users_controller = require('../controllers/signupController');

// Home router

//Route to home page
router.get('/', function (request, response, next) {
    console.log("GET request for the home page");
    response.render('index.ejs', {
        title: 'Home'
    });
});

// Login router

//Route to login page
router.get('/login', function (request, response, next) {
    console.log("GET request for the login page");
    response.render('login.ejs', {
        title: 'Login'
    });
});

// Signup router

// GET request for creating user. NOTE This must come before route for id (i.e. display user).
router.get('/signup', users_controller.user_create_get);

// POST request for creating user.
router.post('/signup/create', users_controller.user_create_post);

module.exports = router;
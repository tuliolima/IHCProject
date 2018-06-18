var express = require("express");
var router = express.Router();

var users_controller = require('../controllers/signupController');
var login_controller = require('../controllers/loginController');
var scheduler_controller = require('../controllers/schedulerController');

// Home router

//Route to home page
router.get('/', function (request, response, next) {
    console.log("GET request for the home page");
    response.render('index.ejs', {
        title: 'Home'
    });
});

// ----- LOGIN ROUTER -----
//Route to login page
router.get('/login', login_controller.login_get);
router.post('/login/signin', login_controller.login_post);

// ----- SIGNUP ROUTER -----
// GET request for creating user. NOTE This must come before route for id (i.e. display user).
router.get('/signup', users_controller.user_create_get);
// POST request for creating user.
router.post('/signup/create', users_controller.user_create_post);

// ----- SCHEDULER ROUTER -----
//router.get('/',scheduler_controller.scheduler_get);

//router.get('/',scheduler_controller.scheduler_post);


module.exports = router;
var express = require("express");
var router = express.Router();

// Home page
router.get('/',function(request, response, next){
    console.log("GET request for the home page");

    response.render('index.ejs',{
       title: 'Minha Agenda'
   }); 
});

 //route to login page
router.get('/login', function (request, response, next){
    console.log("GET request for the login page");
    response.render('login.ejs',{
        title: 'Login'
    });
});

 //route to sign up page
 router.get('/signup', function (request, response, next){
    console.log("GET request for the sign up page");
    response.render('signup.ejs', {
        title: 'Sign Up'
    });
 });

module.exports = router;
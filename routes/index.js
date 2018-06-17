var express = require("express");
var router = express.Router();

//Route to home page
router.get('/',function(request, response, next){
    console.log("GET request for the home page");

    response.render('index.ejs',{
       title: 'Home'
   }); 
});

 //Route to login page
router.get('/login', function (request, response, next){
    console.log("GET request for the login page");
    response.render('login.ejs',{
        title: 'Login'
    });
});

 //Route to sign up page
 router.get('/signup', function (request, response, next){
    console.log("GET request for the sign up page");
    response.render('signup.ejs', {
        title: 'SignUp'
    });
 });

module.exports = router;
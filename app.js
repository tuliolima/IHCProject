//import modules
var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");

//set the server port
var port = 8081;

//our app variable using express module
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

//use the public folder as static folder
app.use(express.static('public'));

//set the views folder for pages (.html and .ejs files)
app.set('views', path.join(__dirname , '/views'));

// ----- ROUTES -----
//route to index page
app.get('/', function (request, response) {
    console.log("GET request for the homepage");
    response.render('index.ejs');
 });

 //route to login page
 app.get('/login', function (request, response){
    console.log("GET request for the login page");
    response.render('login.ejs');
});

 //route to sign up page
 app.get('/signup', function (request, response){
    console.log("GET request for the sign up page");
    response.render('signup.ejs');
 });

 // ----- SERVER -----
//server variable that listens in the specified port
var server = app.listen(port, function () {

    var host = server.address().address;
 
    console.log("Listening at http://%s:%s", host, port);
 })
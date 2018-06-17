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

//route to index page
app.get('/', function (request, response) {
    console.log("Got a GET request for the homepage");
    response.render('index.ejs');
 });

//server variable that listens in the specified port
var server = app.listen(port, function () {

    var host = server.address().address;
 
    console.log("Listening at http://%s:%s", host, port);
 })
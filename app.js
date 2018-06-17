//import modules
var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");

//set the routes
var routes = require("./routes/index");

//set the server port
var port = 8081;

//our app variable using express module
var app = express();

// ----- View engine setup -----
// set the view engine to ejs
app.set('view engine', 'ejs');
//use the public folder as static folder
app.use(express.static('public'));
//set the views folder for pages (.html and .ejs files)
app.set('views', path.join(__dirname , '/views'));

//Setting the used routes
app.use('/', routes);

// ----- SERVER -----
//server variable that listens in the specified port
var server = app.listen(port, function () { 
    console.log("Listening at http://localhost:%s", port);
 });
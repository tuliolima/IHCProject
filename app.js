//Import modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require("path");

//Set the routes
var routes = require("./routes/index");

//Our app variable using express module
var app = express();

// ----- View engine setup -----
//Set the view engine to ejs
app.set('view engine', 'ejs');
//Use the public folder as static folder
app.use(express.static('public'));
//Set the views folder for pages (.html and .ejs files)
app.set('views', path.join(__dirname , '/views'));

//Set the used routes
app.use('/', routes);

// ----- ERRORS -----
//Catch 404 and forward to error handler
app.use(function(request, response, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  //Error handler
  app.use(function(err, request, response, next) {
    // set locals, only providing error in development
    response.locals.message = err.message;
    response.locals.error = request.app.get('env') === 'development' ? err : {};
  
    //Render the error page
    response.status(err.status || 500);
    response.render('error');
  });

//Exporting the module
module.exports = app;
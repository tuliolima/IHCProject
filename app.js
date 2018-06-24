//Import modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var session = require('express-session');

//Set the routes
var indexRouter = require("./routes/indexRouter");

//Our app variable using express module
var app = express();
app.use(bodyParser());

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost/webapp';
mongoose.connect(mongoDB);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

// MONGOOSE CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose connection open to: ' + mongoose.connection.name);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose disconnected'); 
});

// ----- View engine setup -----
//Set the view engine to ejs
app.set('view engine', 'ejs');
//Use the public folder as static folder
app.use(express.static('public'));
//Set the views folder for pages (.html and .ejs files)
app.set('views', path.join(__dirname , '/views'));
//Setting the session
app.use(cookieParser());
// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({key: 'user_id', secret: 'ProjetoFinalAgenda', resave: false, saveUninitialized: false}));

//Set the used routes
app.use('/', indexRouter);

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
    console.log("Error status: %s", err.status);
    console.log("%s", err.message);
    response.render('error');
  });

//Exporting the module
module.exports = app;
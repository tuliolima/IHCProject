var express = require('express');
var mongoose = require("mongoose");
var path = require("path");

var app = express();

app.use(express.static('public'));
app.set('views', path.join(__dirname , '/views'));

app.get('/', function (request, response) {
    console.log("Got a GET request for the homepage");
    response.render('index.ejs');
 });


var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;
 
    console.log("Listening at http://%s:%s", host, port);
 })
//Imports
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");

//Definição de variáveis
var app = express();

//Load render engine
app.set('views', path.join(__dirname , '/views')); //seta o path de views como diretorio atual + /views
app.engine('html', require('ejs').renderFile); //explicita que arquivos html requerem o modulo EJS
app.set('view engine', 'ejs'); //seta o modulo EJS como engine das views
app.use('/', express.static(path.join(__dirname, 'public')))

//Setup do servidor
app.get('/', function(request, response){
    response.render('index.html');
});

app.listen(3000, function(){ //escuta na porta 3000 e retorna no console
    console.log('Server started on port 3000...')
})


//ROUTES

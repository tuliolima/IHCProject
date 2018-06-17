var app = require('../app');
var server = app.listen(8081, function () {
    console.log('Listening at %s', server.address().port);    
})
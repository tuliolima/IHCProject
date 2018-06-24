var Event = require('../models/event');

// Display home page on GET.
exports.home_page_get = function (req, res) {
    console.log("GET request for the home page");
    res.render('index.ejs', {
        title: 'Home'
    });
};

//Event creation POST verb
exports.home_page_event_post = function(req,res){
    console.log("POST request for the home page event creation dialog box")
    var event = new Event({
        eventId: req.body.id,
        title: req.body.title,
        description: req.body.description,
        place: req.body.place,
        date: req.body.date,
        time: req.body.time,
        color: req.body.color
    });
    
    event.save(function (error) {
        if (error) {
            console.log('Evento não cadastrado: %s', error.message);
        } else {
            console.log('Evento cadastrado com sucesso');
        }
    });

    res.redirect('/');
};
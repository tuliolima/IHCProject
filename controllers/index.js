var Event = require('../models/event');

// Display home page on GET.
exports.home_page_get = function (req, res) {
    console.log("GET request for the home page");
    if(!req.session.user){
        res.redirect('/login');
    }else{
        res.render('index.ejs', {
            title: 'Home'
        });
    }
};

//Event creation POST verb
exports.home_page_event_post = function(req,res){
    console.log("POST request for the home page event creation dialog box")
    if(!req.session.user){
        res.redirect('/login');
    }else{
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
    }

};


//Event UPDATE POST verb
exports.home_page_event_update = function(req,res){
    console.log("POST request for the home page event update dialog box")
    if(!req.session.user){
        res.redirect('/login');
    }else{
        var id = req.body.id;  
  
        Event.findById(id, function(err, doc) {
            if(err){
                console.log("Erro ao encontrar evento no banco");
                return res.status(500).send();
            }
            doc.eventId = req.body.id;
            doc. title = req.body.title;
            doc.description = req.body.description;
            doc.place = req.body.place;
            doc.date = req.body.date;
            doc.time = req.body.time;
            doc.color = req.body.color; 
            doc.save();  
        });
        console.log("Evento atualizado");
        res.status(200).send(); 
    }
};

//Event DELETE GET verb
exports.home_page_event_delete = function(req,res){
    console.log("POST request for the home page event delete dialog box")
    if(!req.session.user){
        res.redirect('/login');
    }else{
        var id = req.body.id;
        Event.findByIdAndRemove(id, function(err, doc) {
            if(err){
                console.log("Erro ao encontrar evento no banco");
                return res.status(500).send();
            }
        });
    }
};

//READ AN EVENT
exports.home_page_event_get = function(req,res){
    console.log("GET REQUEST for the home page READ event")
    if(!req.session.user){
        res.redirect('/login');
    }else{
        var eventId = req.body.id;
        var title = req.body.title;
        //OPÇÃO 1 DE FIND: encontrar pelo ID no mongo
        // Event.findById(id,function(err,ev){
        //     if(err){
        //         console.log("Erro ao encontrar evento no banco");
        //         return res.status(500).send();
        //     }
        // });
        //OPÇÃO 2 DE FIND: encontrar pelo titulo no banco
        Event.findOne({title: title},function(err,ev){
            if(err){
                console.log("Erro ao encontrar evento no banco");
                return res.status(500).send();
            }
            return res.status(200).send(ev); //retorna o objeto inteiro
        });
    }
}

//READ ALL EVENTS
exports.home_page_event_get_all = function(req,res){
    console.log("GET REQUEST for the home page READ All event")
    if(!req.session.user){
        res.redirect('/login');
    }else{
        Event.find({}, function(err,event){
            if(err){
                console.log("Erro ao encontrar evento no banco");
                return res.status(500).send();
            }
            return res.status(200).send(event); //retorna o objeto inteiro
        });
    }
}
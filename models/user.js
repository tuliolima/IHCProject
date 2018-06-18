var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema(
    {
        name:{
            first: {type: String, required: true, maxlength: 100},
            last: {type: String, required: true, maxlength: 100}
        },
        date_of_birth: {type: Date, required: true},
        gender: {type: String, enum: ['Male','Female']},
        handicap: {Type: Boolean, default: false},
        profession: {type: String, maxlength: 50},
        email: {type: String, required: true, maxlength: 50},
        password: {type: String, required: true, minlength: 8, maxlength: 30},
        username: {type: String, required: true, minlength: 3, maxlength: 30},
        interests: [{type: String, enum:['Sports','Technology','Videogames','Nature','Travel','Economy','Healthcare','Security','Gossip','Gastronomy','Relationships','Movies','Music','Religion','History','Party','Education','Politics','Art','None']}],
        events: [{type: ObjectId, ref: 'Event'}]
    }
  );


//Export model
module.exports = mongoose.model('User', UserSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

var EventSchema = new Schema(
    {
        eventId: {type: String}, //também não coloquei nada especifico aqui porque o mongo já cria um ID
        title:{type: String, required: true, max: 100},
        description:{type: String, max:140},
        place: {type: String, max: 100},
        date: {type: String, required: true},
        time: {type: String}, //não tem default e nem required que é pra não dar treta
        //priority: {type: String, enum:['Very High','High','Medium','Low', 'None'], default: 'None'},
        //status: {type: String, enum: ['Finished', 'Late', 'In Progress', 'Pending', 'Delayed','None'], default: 'None'},
        color: {type: String, enum: ['amarelo', 'vermelho', 'azul', 'verde'], default: 'vermelho'}       
    }
  );

//Export model
module.exports = mongoose.model('Event', EventSchema);
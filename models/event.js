var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

var EventSchema = new Schema(
    {
        name:{type: String, required: true, max: 100},
        date: {type: Date, required: true},
        tag : [{type: ObjectId, ref: 'Subject'}],
        descriptiom:{type: String, max:140},
        place: {type: String, max: 100},
        priority: {type: String, enum:['Very High','High','Medium','Low', 'None'], default: 'None'},
        status: {type: String, enum: ['Finished', 'Late', 'In Progress', 'Pending', 'Delayed','None'], default: 'None'},       
    }
  );


//Export model
module.exports = mongoose.model('Event', EventSchema);
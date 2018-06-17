var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        last_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date, required: true},
        email: {type: String, required: true, max: 50},
        password: {type: String, required: true, min: 8, max: 30},
        username: {type: String, required: true, min: 3, max: 30}
        // Tem que colocar maiores informações
    }
  );


//Export model
module.exports = mongoose.model('User', UserSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
	nombre:{type:String},
	correo:{type:String},
	password:{type:String}
});

module.exports = mongoose.model('User', userSchema);


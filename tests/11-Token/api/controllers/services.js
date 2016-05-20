// services.js
//para el codificado del token
var jwt = require('jwt-simple');
//para establecer la caducidad del token  
var moment = require('moment');  
//para leer la frase de encriptacion desde archivo
var config = require('./config');

exports.createToken = function(user) {  
  var payload = {
  	//en el token guardamos la _id del usuario
    sub: user._id,
    //cuando se crea
    iat: moment().unix(),
    //cuando caduca
    exp: moment().add(1, "days").unix(),
  };
  //devolvemos el token creado y codificado 
  return jwt.encode(payload, config.TOKEN_SECRET);
};
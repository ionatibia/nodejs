// middleware.js
//para descodificar el token
var jwt = require('jwt-simple'); 
//para comprobar la caducidad del token 
var moment = require('moment');  
//para leer la frase de encriptacion desde archivo
var config = require('./config');


//funcion para asegurar la autenticidad del token
exports.ensureAuthenticated = function(req, res, next) {  
  //leemos la cabecera de acceso por token
  var token = req.headers['x-access-token'];
  if(!token) {
    return res
      .status(403)
      //si no tiene cabecera
      .send({message: "Tu petición no tiene cabecera de autorización"});
  }

  //decodificamos el token
  var payload = jwt.decode(token, config.TOKEN_SECRET);

  if(payload.exp <= moment().unix()) {
     return res
         .status(401)
         //si está caducado
        .send({message: "El token ha expirado"});
  }
  //en req.user está el _id de usuario
  req.user = payload.sub;
  //pasa el test y sigue
  next();
}
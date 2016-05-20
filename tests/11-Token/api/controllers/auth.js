// auth.js
var mongoose = require('mongoose');  
var User = require('../models/user'); 
//para crear el token
var service = require('./services');

//esto es solo para crear usuarios para tener alguno de prueba
exports.emailSignup = function(req, res) {  
    var user = new User({
        nombre:req.body.nombre,
        correo:req.body.correo,
        password:req.body.password
    });

    user.save(function(err){
        return res
            .status(200)
            .send({token: service.createToken(user)});
    });
};


//login normal (en tu caso en la función del passport)
exports.emailLogin = function(req, res) {  
    User.findOne({correo: req.body.correo.toLowerCase()}, function(err, user) {
        //si se loguea correctamente enviamos el token al cliente
        return res
            .status(200)
            //enviamos el token al cliente para que lo guarde y lo utilice en cada peticion
            .send({token: service.createToken(user)});
    });
};
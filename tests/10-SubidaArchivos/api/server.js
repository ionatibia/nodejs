var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//IMPORTANTE para poder acceder al contenido de la carpeta public
app.use('/public',express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/*************rutas****************/
var fotosCtrl = require('./controllers/fotos');

app.post('/guardarFotoPerfil',fotosCtrl.guardarFotoPerfil);

app.post('/guardarImagen', fotosCtrl.guardarImagen);

app.post('/guardarVideo', fotosCtrl.guardarVideo);

app.use("*", function(req, res) {
  res.send("ko");
});

/***********servidor***************/
var server = require('http').Server(app);
var server_port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1';
server.listen(server_port,server_ip_address, function() { 
  console.log("Listening on " + server_ip_address + ", server_port " + server_port);
  console.log("Listening on port " + server_port);
});
// server.js
var express = require('express');  
var bodyParser = require('body-parser');  
var mongoose = require('mongoose');  
var cors = require('cors');  
var auth = require('./controllers/auth');  
var middleware = require('./controllers/middleware');

// Configuramos Express
var app = express();  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended: true}));  
app.use(cors());  
app.set('port', 3000);

// Importamos nuestros modelos, 
// en este ejemplo nuestro modelo de usuario
require('./models/user');



// Rutas de autenticación y login
app.post('/auth/signup', auth.emailSignup); // para crear usuario
app.post('/auth/login', auth.emailLogin); //para logearse

// Ruta solo accesible si estás autenticado
app.get('/private',middleware.ensureAuthenticated, function(req, res) {
	res.send(req.user);//_id del usuario si el token es correcto
} );




mongoose.connect('mongodb://localhost', function(err) {  
    app.listen(app.get('port'), function(){
        console.log('Express corriendo en http://localhost:3000');
    });
});
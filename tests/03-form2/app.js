var express = require('express');
var app = express();

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/',function (req,res) {
	res.sendFile(__dirname + '/public/hello.html');
});

app.post('/user', function (req, res) {
	var datos = {
		nombre: req.body.nombre,
		apellido: req.body.apellido
	};
	res.json(datos);
});

var server = app.listen(process.env.PORT || 3000, function(){
    console.log('Listening in port %d', server.address().port);
});
var express = require('express');
exphbs = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.render('home');
});

app.get('/form', function (req, res) {
	res.render('formulario', {layout:'main'});
});

app.post('/addUser', function (req, res) {
	var usuario = {
		nombre: req.body.nombre,//imprescindible body-parser
		apellido: req.body.apellido
	};
	res.json(usuario);
});

app.get('/with-layout', function (req, res) {
	res.render('home', {layout:'main'});
});

app.get('/table', function (req, res) {
	res.render('table', {name:'Iker'});
});

app.get('/table-array', function (req, res) {
	var users = {
		users:[
			{name:'Iker'},
			{name:'Pepe'}
		]
	};
	res.render('table2', users);
});

app.get('/table-array-title', function (req, res) {
	var users = {
		title:'Nombres',
		users:[
			{name:'Iker'},
			{name:'Pepe'}
		]
	};
	res.render('table2', users);
});


var server = app.listen(process.env.PORT || 3000, function(){
    console.log('Listening in port %d', server.address().port);
});
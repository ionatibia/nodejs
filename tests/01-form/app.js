// form
// http://expressjs.com/4x/api.html#req.params
var express = require('express');
var app = express();

var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// body-parser for POST
// https://github.com/expressjs/body-parser
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// public files
app.use(express.static(__dirname + '/public'));


// **********************************************

// app.get('/', function(req, res) {
//     res.redirect('/hello.html');
// });

// OR

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/hello.html');
});


// GET /search?q=tobi+ferret
// curl http://localhost:3000/search?q=tobi+ferret
app.get('/search', function(req, res) {
    res.send('Iepaaaaa ' + req.query.q);
});

// GET /user/<name>
// curl http://localhost:3000/user/<name>
app.get('/user/:name', function(req, res) {
    res.send('Hello ' + req.params.name);
});

app.get('/:year/:day', function(req, res) {
    res.send('year/day: ' + req.params.year + '/' + req.params.day);
});

app.get('/listademareas', function(req, res) {

	var mareas = {
		dia : "11/10/2015",
		pleamar: [
					"12:12",
					"0:23"
				],
		bajamar: [
					"17:09",
					"5:23"
				]
	};

	res.json(mareas);

});


// POST /user/
// curl --data "name=<name>" http://localhost:3000/user
app.post('/user/', function(req, res) {
    res.send('User ' + req.body.name + ' added');
});
// ************************************************


var server = app.listen(process.env.PORT || 3000, function(){
    console.log('Listening in port %d', server.address().port);
});
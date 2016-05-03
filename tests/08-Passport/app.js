var express = require('express');
var app = express();
var users = require("./modules/users");

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
  done(null, user);
});

  passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
  	console.log(username+" "+password);
  	users.buscarUsuario(username,function(error,user) {
  		if (error) {
  			return done(err); 
  		}
      	if (!user) {
        	return done(null, false, { message: 'Incorrect username.' });
      	}
      	if (password != user.password) {
        	return done(null, false, { message: 'Incorrect password.' });
      	}
      	return done(null, user);
  	})
   /* User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });*/
    return done(null, 'user');
  }
));

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log(req.user.username);
    res.send("ok");
  });



var server = app.listen(process.env.PORT || 3000, function(){
    console.log('Listening in port %d', server.address().port);
});
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session'); 
var SessionStore = require('express-mysql-session')(session);

var routes = require('./routes/index');


var app = express();


var options = {
	host: 'localhost',
	 port: 3306, 
	 user: 'root',
	 password: 'abc',
	 database: 'tasteChallenge' 
	 } ;
	 
	 app.use(session({ 
		 key: 'session_cookie_name',  
		 secret: 'session_cookie_secret',  
		 store: new SessionStore(options) ,
		 resave: true,
         saveUninitialized: true
		 }));

// view engine setup
app.set('port',process.env.PORT||3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'),function(){
	console.log('Express server listening on port '+ app.get('port'));
});

module.exports = app;

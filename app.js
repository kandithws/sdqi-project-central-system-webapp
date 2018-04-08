var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('express-flash');
var session = require('express-session');
var passport = require('passport');
var viewHelper = require('./helpers/view_helper');
var indexRouter = require('./routes/index');
var carsRouter = require('./routes/cars');
// var quotesRouter = require('./routes/quotes');
// var usersRouter = require('./routes/users');
var finale = require('finale-rest')

var db = require('./models/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secretgoeshere'));
app.use(session({ cookie: { maxAge: 60000 },
  resave: true, 
  saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// Define view helpers here to work with express layouts
app.use(function(req,res, next){
  res.locals.req = req;
  res.locals.res = res;
  res.locals.current_user = req.user || false
  next();
})
app.locals.msgType2AlertMap = viewHelper.message_alert_map;

// ------------------ App-Resources Routing ---------------------- 
app.use('/', indexRouter);
//app.use('/quotes', quotesRouter);
app.use('/cars', carsRouter);

var User = require('./models/index').User;
//------ Authen Routes ---
var authRoute = require('./routes/auth.js')(app,passport);
require('./config/passport/passport.js')(passport,User);

// app.use('/users', usersRouter);
// View Helpers


// Example, Generating Restful api from Sequelize Model.
//finale.initialize({
//  app: app,
//  base: '/api',
//  sequelize: db.sequelize
//});

//var quoteResource = finale.resource({
//  model: db.Quote,
//  endpoints: ['/quotes', '/quotes/:id']
//});

// setup basic view middleware that related to user 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // const env = process.env.NODE_ENV || 'development';
  const env = require('dotenv').load() || 'development';
  res.locals.ENV = env;
  res.locals.ENV_DEVELOPMENT = env == 'development';

  // res.locals.req = req;
  // res.locals.res = res;
  //res.locals.current_user = req.user || false
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

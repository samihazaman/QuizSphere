var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
const { connectToDB } = require('./models/db');
const session = require('express-session');


var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var indexRouter = require('./routes/index');
var quizRouter = require('./routes/quiz');    
var resultsRouter = require('./routes/results');


var app = express();
//Database connection!!
(async () => {
  try {
    await connectToDB();
    console.log('Database initialized');
  } 
  
  catch (error) {
    console.error('Failed to start database:', error);
  }
})();

app.use(session({
  secret: 'quizsphere11341290',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/index', indexRouter); 
app.use('/quiz', quizRouter); 
app.use('/results', resultsRouter);

app.get('/', (req, res) => {
  res.render('index');  
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;



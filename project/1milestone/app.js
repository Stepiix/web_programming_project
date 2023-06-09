//
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var itemsRouter = require('./routes/items');
var placesRouter = require('./routes/places');
var salesRouter = require('./routes/sales');
var userRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
const { log } = require('console');

mongoose.Promise = global.Promise

mongoose.connect('mongodb+srv://demo:6uCdbSDByPH4ZaFr@cluster0.rlmhow5.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }) //find here https://gitlab.estg.ipp.pt/paw/exemplos-pr-ticos/fp6/-/blob/master/app.js
  // mongoose.connect('mongodb://localhost/items')
  .then(() => console.log(' connected to DB!'))
  .catch(() => console.log(' error connecting to DB!'))

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/items', itemsRouter);
app.use('/places', placesRouter);
app.use('/sales', salesRouter);
app.use('/users', userRouter);
app.use('/admins', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

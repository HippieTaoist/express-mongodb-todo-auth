require("dotenv").config()

var createError = require('http-errors');
var express = require('express');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/usersRouter');
var todoRouter = require('./routes/todo/todoRouter');

const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log('')
    console.log(' [Con]            [noC]')
    console.log(' [nec]            [cen]')
    console.log(' [ted]            [det]')
    console.log('          [OO]')
    console.log('         [G  G]')
    console.log('        [N    N]')
    console.log('       [O      O]')
    console.log('      [M        M]')
    console.log('   [DB____________BD]')
    console.log('')
    console.log('          YYYY')
    console.log('          EEEE')
    console.log('          SSSS')
  })
  .catch(err => console.error(err));

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/todo', todoRouter);


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
  res.json({
    error: "error in app",
    err: err.stack
  });
});

module.exports = app;
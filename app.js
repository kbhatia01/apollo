var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
const config = require("./config/index")['devo'];
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(config.MongoDb, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err) {
  if (err) {
    console.log(err);
  }
  else
    console.log("connected");
})
app.use('/api', indexRouter);

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
  res.json({ "status": "failure", reason: err.message });
});
app.listen(8080, function (err) {
  if (err) {
    console.log(err);
  }
  else
    console.log("connected to port 8080")
})
module.exports = app;

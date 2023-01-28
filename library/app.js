require('dotenv').config();
console.log(process.env)

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');
const { mainModule } = require('process');

var app = express();
const mongodb = process.env.USER_URL;
console.log(mongodb);

const main = async () => { 
  await mongoose.connect(mongodb);
}
main().catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

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

// mongoose
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  title: String,
  published: Date,
})
const BookModel = mongoose.model('BookModel', BookSchema)
const book_instance = new BookModel({ title: 'You are losting me', published: new Date()})

book_instance.save((err) => {
  if (err) return console.log(err);
  console.log('saved!');
})

module.exports = app;

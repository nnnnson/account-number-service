const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const tokenRouter = require('./routes/token');
const detokenRouter = require('./routes/detoken');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tokenize', tokenRouter);
app.use('/detokenize', detokenRouter);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);

  // set locals, only providing error in development
  //   res.locals.message = err.message;
  //   res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.message ? 400 : 500).json({ error: err.message } || { error: 'Internal Server Error' });
});

module.exports = app;

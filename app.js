/**
 * Created by toonew on 2017/3/21.
 */
const path = require('path');

const express = require('express');
const session = require('express-session');
const bodyParse = require('body-parser');
const config = require('config');
const RedisStore = require('connect-redis')(session);

const index = require('./route/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: false}));

app.use(session({
  secret: 'node-seed',
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({
    port: config.redis_port,
    host: config.redis_host,
    db: config.redis_db,
    pass: config.redis_password,
  }),
}));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', index);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


const http = require('http');

const server = http.createServer(app);

server.listen(3000, function () {
  console.log('node listen in 3000');
});

server.on('error', function (err) {
  console.error("node 错误" + err);
});

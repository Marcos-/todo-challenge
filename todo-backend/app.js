var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('./database/connection.js')
const bcrypt = require('bcrypt');
const session = require('express-session');
var bodyParser = require('body-parser')
var cors = require('cors')

var indexRouter = require('./routes/index');
var projectsRouter = require('./routes/projects');

var app = express();

app.use(cors())

// Auth session
app.use(session({
  secret: "boltecb hire me",
  resave: false,
  saveUninitialized: true
}));

const UserSchema = new mongoose.Schema({
    username: {
      type: String, 
      required: true
    },
    hashedPw:{
      type:String, 
      required:true
    }
});

const User = mongoose.model("User", UserSchema);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/projects', (req, res, next) => {req.user = req.session.user; next()}, projectsRouter);
// app.use('/login', usersRouter);

app.post("/register", async (req, res, next)=>{
  const username = req.body.username
  const password = req.body.password
  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const user = await User.create({username, hashedPw})
    await user.save();
    return res.send(user);
  }catch (e) {
    console.log(e)
    return res.send(e);
  }
});


app.post("/login", async (req, res, next)=>{
  const username = req.body.username
  const password = req.body.password
  try {
    const user = await User.findOne({username});
    console.log(user)
    const matchstatus = await bcrypt.compare(password, user.hashedPw);
    if(matchstatus == true){
      console.log('logged in!'); 
      req.session.user = user;
      console.log(req.session)
      return res.send(user);
    }
    else{
      return res.send("Wrong ID or Password");
    }
  } catch (e) {
    console.log(e)
  }
});

app.post("/logout", (req, res, next)=>{
  req.session.user = null;
  return res.send("DONE");
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

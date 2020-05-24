var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var FileStore = require("session-file-store")(session);
var passport = require("passport");
var authenticate= require("./authenticate");
var config = require("./config");
var index = require('./routes/index');
var users = require('./routes/users');
var dishRouter = require("./routes/dishRouter");
var promoRouter = require("./routes/promotionRouter");
var leaderRouter = require("./routes/leaderRouter");
var uploadRouter = require("./routes/uploadRouter");
const mongoose = require("mongoose");
const Dishes = require("./models/dishes");
var favouriteRouter = require("./routes/favoriteRouter");

const url = config.mongoUrl;

const connect = mongoose.connect(url);
connect.then((db)=>{
  console.log("CConnected correctly to server");

},(err)=>
{
  console.log(err);
});
var app = express();
app.all("*",(req,res,next)=>{
  if(req.secure)
  {
    //incoming req is already a secure req
    return next();
  }
  else{
    res.redirect(307, "https://"+req.hostname+":"+app.get("secPort")+req.url);

  }


});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser("12345-67890-09876-54321"));
// app.use(session({
//   name:"session-id",
//   secret:"12345-67890-09876-54321",
//   saveUninitialized:false,
//   resave:false,
//   store :new FileStore()
// }));

app.use(passport.initialize);
// app.use(passport.session());


app.use('/', index);
app.use('/users', users);
//using signed cookie here


// function auth(req,res,next)
// {
//   console.log(req.session);
//   if(!req.user)
//   {
    
 
//     var err = new Error("you are not authenticated !");
   
//     err.status = 403;
//        return next(err);

  
//   // var auth = new Buffer.from(authHeader.split(" ")[1],"base64").toString().split(":");

//   // var username = auth[0];
//   // var password = auth[1];

//   // if(username ==="admin" && password ==="password")
//   // {
//   //   req.session.user = "admin";

//   //   next();

//   // }
//   // else
//   // {
//   //   var err = new Error("You are not authenticated !");
//   //   res.setHeader("WWW-Authenticate","Basic");
//   //   err.status = 401;
//   //     return next(err);


//   // }


//   }
//   else
//   {
//     next();
//     // if(req.session.user === "authenticated")
//     // {
//     //   next();

//     // }
//     // else{
//     //   var err = new Error("You are not authenticated !");
    
//     //   err.status = 403;
//     //   return next(err);

//     // }

//   }
//   // console.log(req.headers);

  
// }
// app.use(auth);


app.use(express.static(path.join(__dirname, 'public')));
app.use("/dishes",dishRouter);
app.use("/promotions",promoRouter);
app.use("/leaders",leaderRouter);
app.use("/imageUpload",uploadRouter);
app.use("/favourites",favouriteRouter);

// catch 404 and forward to error handler
app.use((req, res, next)=> {
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
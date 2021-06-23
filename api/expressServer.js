// Dependencies
// =============================================================
var express = require("express");
require('dotenv').config();

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3005;



// Mongo DB connection ========================================
var {Todos} = require('./models/todos');

var mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb:27017/test', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR'));
db.once('open', function() {
  // we're connected to DB
  console.log('Connected to MongoDB...')
});



// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// staticly serve the React build artifacts if NOT in development mode
if (process.env.NODE_ENV === "production") {
  console.log("Serving Static Build Content.");
  app.use(express.static("build"));
}

// Routes
// =============================================================

// Basic route
app.get("/api/test", function(req, res) {
    Todos.find(function (err, todos) {
      if (err) return console.error("FRONTEND Error retrieve data from Todos schema --->>>", err);
      console.log('FRONTEND todos --- >>>', todos);
    });
  res.json({status: "success"});
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("API endpoint listening on PORT " + PORT);
});


// -----------------------------------------------------------
// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// // var mongoose = require('mongoose');
// // mongoose.connect('mongodb://mongodb:27017/test', {useNewUrlParser: true});

// // var db = mongoose.connection;
// // db.on('error', console.error.bind(console, 'CONNECTION ERROR'));
// // db.once('open', function() {
// //   // we're connected to DB
// //   console.log('Connected to MongoDB...')
// // });

// // var {Todos} = require('./models/todos');

// var app = express();
// var PORT = process.env.PORT || 3005;

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// // Basic route
// app.get("/api/test", function(req, res) {
//   console.log('/api/test working -------- **** >>>>>>>>>>>>>>>>>>>>>>>>>>>>');
//   // Todos.find(function (err, todos) {
//   //     if (err) return console.error("FRONTEND Error retrieve data from Todos schema --->>>", err);
//   //     console.log('FRONTEND todos --- >>>', todos);
//   //   });
//   res.json({status: "success"});
// })

// // Starts the server to begin listening
// // =============================================================
// app.listen(PORT, function() {
//   console.log("API endpoint listening on PORT " + PORT);
// });

// module.exports = app;

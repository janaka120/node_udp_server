// Dependencies
// =============================================================
var express = require("express");
require('dotenv').config();

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3005;

var cors = require('cors')
app.use(cors()) // Use this after the variable declaration

// Mongo DB connection ========================================
var mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb:27017/test', {useNewUrlParser: true});

var {UserActivities} = require('./models/user_activities');



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR'));
db.once('open', function() {
  // we're connected to DB
  console.log('Connected to MongoDB...');
  // setInterval(() => {
  //     const randomMathBaseValue = Math.round(20 + 80 * Math.random());
  //     const userActivityObj = {
  //       userId: 'user_001',
  //       acc: randomMathBaseValue + 1000,
  //       w: randomMathBaseValue + 220,
  //       accX: randomMathBaseValue + 65,
  //       accY: randomMathBaseValue + 98,
  //       accZ: randomMathBaseValue + 32.45,
  //       gyroX: randomMathBaseValue + 60,
  //       gyroY: randomMathBaseValue + 12.43,
  //       gyroZ: randomMathBaseValue + 78.54
  //     };
  //     saveUserActivityToDB(userActivityObj);
  // }, 500);
  
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

// Get User Activities route
app.get("/api/user-activities", function(req, res) {
  const responseObj = {
    status: "fail",
    data: null
  };
  const start = new Date(new Date().getTime() - (1 * 60 * 60 * 1000)); // last 1 hour Date-time  
  // console.log("new Date().getTime() >>>>", new Date().getTime());
  // console.log("24 * 60 * 60 * 1000 >>>>", 24 * 60 * 60 * 1000);
  // console.log("start >>>>", start);
  UserActivities.find({ "created_at": { "$gte": start } }, function (err, activities) {
    if (err) {
      console.error("Error -> retrieve data from USerActivities schema >>", err)
      return  res.json(responseObj);
    };
    responseObj.status = "success";
    responseObj.data = activities;
    return res.json(responseObj);
  });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("API endpoint listening on PORT " + PORT);
});

const saveUserActivityToDB = (activity) => {
  var userActivityData = new UserActivities({
    userId: activity.userId,
    acc: activity.acc,
    w: activity.w,
    accX: activity.accX,
    accY: activity.accY,
    accZ: activity.accZ,
    gyroX: activity.gyroX,
    gyroY: activity.gyroY,
    gyroZ: activity.gyroZ,
  });
  userActivityData.save()
  .then(item => {
    console.log("User Activity Saved to DB...");
  })
  .catch(err => {
    console.log("User Activity Unable to save to DB...");
  });
}
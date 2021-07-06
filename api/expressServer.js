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
var {Users} = require('./models/users');



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR'));
db.once('open', function() {
  // we're connected to DB
  console.log('Connected to MongoDB...');
  
  /* 
  // ------------ manually save user_activities to Mongo DB  
  setInterval(() => {
      const randomMathBaseValue = Math.round(20 + 80 * Math.random());
      const userActivityObj = {
        userId: 'user_001',
        acc: randomMathBaseValue + 1000,
        w: randomMathBaseValue + 220,
        accX: randomMathBaseValue + 65,
        accY: randomMathBaseValue + 98,
        accZ: randomMathBaseValue + 32.45,
        gyroX: randomMathBaseValue + 60,
        gyroY: randomMathBaseValue + 12.43,
        gyroZ: randomMathBaseValue + 78.54
      };
      saveUserActivityToDB(userActivityObj);
  }, 500);
  */

  
  // ----------- user register manually in system(save to mongo DB)
  // deleteAllDataInUsers();
  /* const user1 = {
    userId: "USER_001",
    userName: "user_001",
    password: "user_001",
    firstName: "Ray",
    lastName: "Kulas",
    dob: "1965-02-25",
    nic: "12334587V",
    email: "rlobell0@mac.com", 
    phone: "+947443656889",
    address1: "2",
    address2: "Buhler Junction",
    address3: "Lake park",
    postalCode: 56546,
    city: "Lake city",
    province: "Western",
    gender: "Male",
    careTakerFirstName: "Lobell",
    careTakerLastName: "Sam",
    careTakerPhone: "+947945762345",
    state: "active",
    deviceId: "DEVICE_001",
  };
  const user2 = {
    userId: "USER_002",
    userName: "user_002",
    password: "user_002",
    firstName: "Stormie",
    lastName: "Gawkes",
    dob: "1954-08-25",
    nic: "68834587V",
    email: "gsherwell1@gnu.org", 
    phone: "+947757680976",
    address1: "22657",
    address2: "Roxbury Junction",
    address3: "Road Avenue",
    postalCode: 979900,
    city: "Road city",
    province: "Western",
    gender: "Female",
    careTakerFirstName: "Lobell",
    careTakerLastName: "Sam",
    careTakerPhone: "+947945762345",
    state: "pending",
    deviceId: "DEVICE_002",
  };
  const user3 = {
    userId: "USER_003",
    userName: "user_003",
    password: "user_003",
    firstName: "Ray",
    lastName: "Kulas",
    dob: "1965/02/25",
    nic: "12334587V",
    email: "rlobell0@mac.com", 
    phone: "+947443656889",
    address1: "2",
    address2: "Buhler Junction",
    address3: "Lake park",
    postalCode: 56546,
    city: "Metro city",
    province: "Southern",
    gender: "Male",
    careTakerFirstName: "Rahel",
    careTakerLastName: "FitzGibbon",
    careTakerPhone: "+94794576435345",
    state: "hold",
    deviceId: "DEVICE_003",
  };
  const usersList = [user1, user2, user3];
  usersList.forEach(element => {
    saveUserToDB(element);
  });
*/
 
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

// Get latest User Activities with in 1hour route
app.get("/api/user-activities-latest", function(req, res) {
  const responseObj = {
    status: "fail",
    data: null
  };
  const start = new Date(new Date().getTime() - (1 * 60 * 60 * 1000)); // last 1 hour Date-time  
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

// Get User Activities route by custom date(from | to)
app.get("/api/user-activities", function(req, res) {
  console.log("req.body >>>", req.query);
  const {fromDate, toDate} = req.query
  const responseObj = {
    status: "fail",
    data: null
  };
  if(!fromDate || !toDate) {
    return res.json(responseObj);
  }

  UserActivities.find({ "created_at": { "$gte": fromDate, $lte: toDate } }, function (err, activities) {
    if (err) {
      console.error("Error -> retrieve data from USerActivities schema >>", err)
      return  res.json(responseObj);
    };
    responseObj.status = "success";
    responseObj.data = activities;
    return res.json(responseObj);
  });
});

// Get all Users route
app.get("/api/users", function(req, res) {
  const responseObj = {
    status: "fail",
    data: null
  };
  Users.find(function (err, users) {
    if (err) {
      console.error("Error -> retrieve data from USers schema >>", err)
      return  res.json(responseObj);
    };
    responseObj.status = "success";
    responseObj.data = users;
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

const saveUserToDB = (user) => {
  var userData = new Users({
    userId: user.userId,
    userName: user.userName,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    dob: user.dob,
    nic: user.nic,
    email: user.email,
    phone: user.phone,
    address1: user.address1,
    address2: user.address2,
    address3: user.address3,
    postalCode: user.postalCode,
    city: user.city,
    province: user.province,
    careTakerFirstName: user.careTakerFirstName,
    careTakerLastName: user.careTakerLastName,
    careTakerPhone: user.careTakerPhone,
    state: user.state,
    gender: user.gender,
    deviceId: user.deviceId,
  });
  userData.save()
  .then(item => {
    console.log("User Saved to DB...");
  })
  .catch(err => {
    console.log("User Unable to save to DB...");
  });
}

const deleteAllDataInUsers = async () => {
  try {
    await Users.deleteMany();
    console.log('All Data successfully deleted from Users');
  } catch (err) {
    console.log("Unable to delete all documents from Users");
  }
};
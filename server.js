 'use strict';

var port = process.env.PORT || 8125;
var dgram = require('dgram');
var server = dgram.createSocket('udp4');

var mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb:27017/test', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR'));
db.once('open', function() {
  // we're connected to DB
  console.log('Connected to MongoDB...') 
});

var {Todos} = require('./models/todos');

let isLftAccExceed = false; 
let monitorStartTime = 0; // timestamp in seconds
let isMonitorStarted = false;
let suspectedAsFall = false;
const TIME_PERIOD_OF_MONITORING_UFT = 0.5;

server.on('listening', function () {
    var addr = server.address();
    console.log(
        'Started to listen on %s:%s...',
        addr.address,
        addr.port
        );
      });
      
server.on('message', function (message, remote) {
  const currentTimeStamp = Math.floor(Date.now() / 1000);
  console.log(
    '%d >>> %s', currentTimeStamp,
    message
  );

  const arrayOfInputs = message.toString().split(',');
  const accXStr = arrayOfInputs[0] || null;
  const accYStr = arrayOfInputs[1] || null;
  const accZStr = arrayOfInputs[2] || null;
  const gyroXStr = arrayOfInputs[3] || null;
  const gyroYStr = arrayOfInputs[4] || null;
  const gyroZStr = arrayOfInputs[5] || null;

  if(!accXStr || !accYStr || !accZStr || !gyroXStr || !gyroYStr || !gyroZStr) {
    return;
  }

  const accX = parseFloat(arrayOfInputs[0]);
  const accY = parseFloat(arrayOfInputs[1]);
  const accZ = parseFloat(arrayOfInputs[2]);
  const gyroX = parseFloat(arrayOfInputs[3]);
  const gyroY = parseFloat(arrayOfInputs[4]);
  const gyroZ = parseFloat(arrayOfInputs[5]);

  const acc = Math.sqrt((accX * accX) + (accY * accY) + (accZ * accZ));
  
  const w = Math.sqrt((gyroX * gyroX) + (gyroY * gyroY) + (gyroZ * gyroZ));
  console.log("acc >>", acc, "gyro >>>", w);

  // ** Separately need to be calculate lftAcc, uftAcc and uftGyro **
  const lftAcc = 0.325; //  LFT of acceleration  0.30g – 0.35g 
  const uftAcc = 2.4; // 2.4g
  const uftGyro = 240; // 240∘/s

  if(acc <= lftAcc && !isLftAccExceed) {
    isLftAccExceed = true;
    saveToDB(message);
    return;
  }
  if(isLftAccExceed && !isMonitorStarted) {
    monitorStartTime = Math.floor(Date.now() / 1000);
    isMonitorStarted = true;
  }
  if(isMonitorStarted && (currentTimeStamp - monitorStartTime <= TIME_PERIOD_OF_MONITORING_UFT)) {
    if(uftAcc >= acc && uftGyro >= w) {
      suspectedAsFall = true;
    }else {
      resetPredefineValues();
    }
  }

  if(isMonitorStarted && (currentTimeStamp - monitorStartTime > TIME_PERIOD_OF_MONITORING_UFT)) {
    if(suspectedAsFall) {
      console.log("************** SYSTEM DETECTED FALL ****************");
    }
    resetPredefineValues();
  }
  
  saveToDB(message);
});

const saveToDB = (message) => {
  var myData = new Todos({
      description: message,
      complete: true
    });
    myData.save()
    .then(item => {
      console.log("Saved to DB...");
    })
    .catch(err => {
      console.log("Unable to save to DB...");
    });
}

const resetPredefineValues = () => {
  isLftAccExceed = false;
  monitorStartTime = 0;
  isMonitorStarted = false;
  suspectedAsFall = false;
}

server.bind(port);

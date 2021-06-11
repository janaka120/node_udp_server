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

server.on('listening', function () {
    var addr = server.address();
    console.log(
        'Started to listen on %s:%s...',
        addr.address,
        addr.port
    );
});

server.on('message', function (message, remote) {
    console.log(
        '%s:%s >>> %s',
        remote.address,
        remote.port,
        message
    );
    var myData = new Todos({
        description: message,
        complete: true
      });
      myData.save()
      .then(item => {
        console.log("item saved to database...");
      })
      .catch(err => {
        console.log("unable to save to database...");
      });
});

server.bind(port);

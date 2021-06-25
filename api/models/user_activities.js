const mongoose = require('mongoose');

const userActivitiesScheme = new mongoose.Schema({
    userId: String,
    acc: Number,
    w: Number,
    accX: Number,
    accY: Number,
    accZ: Number,
    gyroX: Number,
    gyroY: Number,
    gyroZ: Number,
}, { timestamps: { createdAt: 'created_at' } });

module.exports.UserActivities =  mongoose.model('UserActivities', userActivitiesScheme); 
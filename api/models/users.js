const mongoose = require('mongoose');

const usersScheme = new mongoose.Schema({
    userId: { type : String , unique : true, required : true, dropDups: true },
    userName: { type : String , unique : true, required : true, dropDups: true },
    password: String,
    firstName: String,
    lastName: String,
    dob: String,
    nic: String,
    email: String,
    phone: String,
    address1: String,
    address2: String,
    address3: String,
    gender: String,
    postalCode: Number,
    city: String,
    province: String,
    careTakerFirstName: String,
    careTakerLastName: String,
    careTakerPhone: String,
    state: String,
    deviceId: String,
}, { timestamps: { createdAt: 'created_at' } });

module.exports.Users =  mongoose.model('Users', usersScheme);

/* 
 * user dob format ===> YYYY-MM-DD
 * user state ===> active | hold | pending
*/
const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const vaccinationModel=require('./Vaccination')
const Schema = mongoose.Schema;


const patientSchema = new Schema({
    firstName:{
        type: String,
        required: [true,'Please enter first name'],
        trim:true,
        minlength :[3,'Minimum name length is 3 characters']
    },
    lastName:{
        type: String,
        required: [true,'Please enter last name'],
        trim:true,
        minlength :[3,'Minimum name length is 3 characters']
    },
    Id:{
        type: String,
        required: true
    },
    birthDay:{
        type: Date,
        required: true
    },
    phoneNumber:{
        type: Number,
        min:10000000, 
        max:99999999
    },
    mobileNumber:{
        type: Number,
        min:100000000, 
        max:999999999
    }, 
    city: {
        type: String,
        // enum: citiesArray,
    },
    street: {
        type: String
    },
    houseNumber: {
        type: String
    },
    vaccination: {
        type: vaccinationModel.schema
    },
    receivingPositiveResult: {
        type: Date
    },
    recovery: {
        type: Date
    }
}, {timestamps: true}); 

const Patient = mongoose.model('Patient',patientSchema);

module.exports = Patient;

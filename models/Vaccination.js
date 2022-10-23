const mongoose = require('mongoose')

// vaccination model
let vaccinationSchema = new mongoose.Schema({
    receivingCoronaVaccine: {
        type: Date
    },
    vaccineManufacturer: {
        type: String
    }
})


const vaccinationModel = mongoose.model('vaccination',vaccinationSchema ,'vaccination' )
module.exports = vaccinationModel

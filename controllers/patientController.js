const Patient = require('../models/patient');
const vaccinationModel = require('../models/Vaccination')

const patient_index = (req, res) => {
  Patient.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { patients: result, title: 'All patients' });
    })
    .catch(err => {
      console.log(err);
    });
}

const patient_details = (req, res) => {
  const id = req.params.id;
  Patient.findById(id)
    .then(result => {
      res.render('details', { patient: result, title: 'Patient Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Patient not found' });
    });
}

const patient_edit_get = (req, res) => {
  const id = req.params.id;
  Patient.findById(id)
    .then(result => {
      res.render('edit', { patient: result, title: 'Patient Edit' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Patient not found' });
    });
}

const patient_update = (req, res) => {
  const id = req.params.id;
  Patient.findByIdAndUpdate(id, req.body, 
    function (err, docs) {
      if (err){ console.log(err); }
      else{ console.log("Updated User : ", docs);}
    })
    .then(result => {
      res.redirect('/patients');
      // res.redirect('/details', { patient: result, title: 'Patient Details' });
    })
    .catch(err => {
      console.log(err);
    });
}

const patient_create_get = (req, res) => {
  res.render('create', { title: 'Create a new patient' });
}

const patient_create_post = (req, res) => {
  var {firstName, lastName, Id, birthDay, phoneNumber, mobileNumber, city, street, houseNumber, receivingCoronaVaccine, vaccineManufacturer, receivingPositiveResult, recovery} = req.body
  let vaccination = new vaccinationModel({receivingCoronaVaccine, vaccineManufacturer});
  const patient = new Patient({firstName, lastName, Id, birthDay, phoneNumber, mobileNumber, city, street, houseNumber, vaccination, receivingPositiveResult, recovery});
  patient.save()
    .then(result => {
      res.redirect('/patients');
    })
    .catch(err => {
      console.log(err);
    });
}

const patient_delete = (req, res) => {
  const id = req.params.id;
  Patient.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/patients' });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  patient_index, 
  patient_details, 
  patient_edit_get,
  patient_update,
  patient_create_get, 
  patient_create_post, 
  patient_delete
}

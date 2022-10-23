const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();


router.get('/create', patientController.patient_create_get);
router.get('/', patientController.patient_index);
router.post('/', patientController.patient_create_post);
router.get('/:id', patientController.patient_details);
router.delete('/:id', patientController.patient_delete);
router.get('/:id/edit', patientController.patient_edit_get);
router.post('/:id', patientController.patient_update);


module.exports = router;

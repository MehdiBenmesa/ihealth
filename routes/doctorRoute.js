
module.exports = (function(express, DoctorController){
    'use strict';
	var doctorRoute = express.Router();
    
    doctorRoute.post('/add-patient', function (req, res) {
        DoctorController.addPatient(req.body.doctorId, req.body.patientId, function(newDoctor) {
            res.json(newDoctor);
        });
    });

    doctorRoute.post('/add-medicament', function(req, res) {
        DoctorController.addMedicament(req.body.doctorId, req.body.patientId, req.body.medicament, req.body.frequency, function(newPatient){
                                       res.json(newPatient);
          }); 
    });
    
    doctorRoute.post('/add-diagnostic', function(req, res){
      DoctorController.addDiagnostic(req.body.doctorId, req.body.patientId,  req.body.diagnostic, function(newPatient){
          res.json(newPatient);
      });
    });

    doctorRoute.post('/add-rendez-vous', function(req, res){
      DoctorController.addRendezVous(req.body.doctorId, req.body.patientId, req.body.date, req.body.hour, req.body.min, function(newDoctor){
        res.json(newDoctor);
      });

    });

    doctorRoute.get('/get-patients/:id', function(req, res){
      DoctorController.getPatients(req.params.id, function(patients){
        res.json(patients);
      });
    });
	return doctorRoute;

});

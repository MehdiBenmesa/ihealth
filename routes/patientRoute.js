
module.exports = ( function(express, PatientController, HTAPatientController, DiabetePatientController, OldPatientController){
	var patientRoute= express.Router(); 
	patientRoute.post("/tensionsample",function(req, res ){
		HTAPatientController.addTensionSample(req.body._id, req.body.rate, function(newPatient){
				res.json(newPatient);
		});
	});

	patientRoute.post('/sugarsample', function(req, res){
		DiabetePatientController.addSugarSample(req.body._id, req.body.rate, function(newPatient){
			res.json(newPatient);
		});
	});
	
	patientRoute.post('/weightsample', function(req, res){
		OldPatientController.addWeightSample(req.body._id, req.body.rate, function(newPatient){
			res.json(newPatient);
		});
	});

	patientRoute.post('/setdoctor', function(req, res){
  	PatientController.setDoctorToPatient(req.body._id, req.body.doctorId, function(newPatient){
		  res.json(newPatient);
    });

	});

	patientRoute.get('/allpatients', function(req, res){
		PatientController.getAllPatients(function(patients){
			res.json(patients);
		});
	});

	return patientRoute;

});

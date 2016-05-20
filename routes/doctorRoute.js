
module.exports = (function(express, DoctorController){
    'use strict';
	var doctorRoute = express.Router();
    
    doctorRoute.post('/setpatient', function (req, res) {
        DoctorController.setPatientToDoctor(req.body.doctorId, req.body.patientId, function(newDoctor) {
            res.json(newDoctor);
        });
    });

	return doctorRoute;

});

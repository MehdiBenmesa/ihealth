module.exports = (function(Patient){
	
	function setDoctorToPatient(idPatient, idDoctor, callback){
		Patient.findByIdAndUpdate(idPatient, 
								  {$push:
									  {
										  doctors : idDoctor
									  }
								  },
								  {safe: true, upsert: true, new : true},
								  function(err, newPatient){
										if(err) throw err;
										callback(newPatient);
								  });
				
	}	

	function getAllPatients(callback){
		Patient.find({}, function(err, patients){
			if(err) throw err;
			callback(patients);
		});
	}

	return {
		setDoctorToPatient : setDoctorToPatient,
		getAllPatients : getAllPatients
	};
});

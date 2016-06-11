module.exports = (function(Doctor, Patient) {
    function addPatient(doctorId, patientId, callback){
        Doctor.findByIdAndUpdate(doctorId,
                                    {$push :
                                      { patients : patientId }
                                    },
                                    {safe: true, upsert: true, new : true},
                                    function (err, newDoctor) {
                                      if(err) throw err;
                                      callback(newDoctor);
                                    });
        Patient.findByIdAndUpdate(patientId,
                                    {$push :
                                      { doctors: doctorId}
                                    },
                                    {safe: true, upsert: true, new : true},
                                    function (err, newPatient) {
                                      if(err) throw err;
                                    });
    }
    
    function addMedicament(doctorId, patientId, medicament, frequency, callback){
        Patient.findByIdAndUpdate(patientId, 
                                  {$push :
                                    {medicaments : {
                                      medicament : medicament,
                                      frequency : frequency
                                      }
                                    }
                                  },
                                  {safe: true, upsert: true, new : true},
                                  function(err, newPatient){
                                      if(err) throw err;
                                      callback(newPatient);
                                  });
    }

    function addRendezVous(doctorId, patientId, date, hour, min, callback){
      Doctor.findByIdAndUpdate(doctorId, 
                                {$push: 
                                    {rendezVous: {
                                      date : date,
                                      hour : hour,
                                      minute : min,
                                      patient : patientId
                                    }
                                    }
                                },
                                {safe: true, upsert: true, new : true},
                                function(err, newDoctor){
                                      if(err) throw err;
                                      callback(newDoctor);
                                });  

      Patient.findByIdAndUpdate(patientId, 
                                {$push: 
                                    {rendezVous: {
                                      date : date,
                                      hour : hour,
                                      minute : min,
                                      doctor: doctorId 
                                    }
                                    }
                                },
                                {safe: true, upsert: true, new : true},
                                function(err, newPatient){
                                      if(err) throw err;
                                });  
    } 

    function addDiagnostic(doctorId, patientId, diagnostic, callback){
      Patient.findByIdAndUpdate(patientId, 
                                {$push: 
                                    {diagnostics: {
                                      diagnostic: diagnostic,
                                      doctor : doctorId
                                    }
                                    }
                                },
                                {safe: true, upsert: true, new : true},
                                function(err, newPatient){
                                      if(err) throw err;
                                      callback(newPatient);
                                }); 

    }

    function getPatients(doctorId, callback){
      Doctor.findOne({_id : doctorId}).populate('patients').exec(function(err, doctor){
            if(err) throw err;
            callback(doctor.patients);
      });
    }

	return {
    addPatient: addPatient,
    addMedicament : addMedicament,
    addRendezVous : addRendezVous,
    addDiagnostic : addDiagnostic,
    getPatients : getPatients
  };
});

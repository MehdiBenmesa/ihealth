module.exports = (function(Doctor) {
    function setPatientToDoctor(doctorId, patientId, callback){
        Doctor.findByIdAndUpdate(doctorId,
                                    {$push :
                                      { patients : patientId }
                                    },function (err, newDoctor) {
                                      if(err) throw err;
                                      callback(newDoctor);
                                    });
    }

	return {
    setPatientToDoctor : setPatientToDoctor
  };
});

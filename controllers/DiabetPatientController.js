 module.exports = (function(DiabetePatient){

	function addSugarSample(_id, rate, callback){
 		DiabetePatient.findByIdAndUpdate(_id, 
								  {$push : 
									  {sugarSamples:{rate : rate}}
								  },
								  {safe: true, upsert: true, new : true},
								  function(err, newPatient){
										if(err)	throw err;
										callback(newPatient);
		});
    
	}
	// var patient = new HTAPatient({
	// 	_id : "5737b55e784bd68730b4ad4b"
	// });
	//
	// addTensionSample(patient);

	return {
		addSugarSample:addSugarSample
	};
 });

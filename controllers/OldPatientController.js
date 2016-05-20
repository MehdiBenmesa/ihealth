
 module.exports = (function(OldPatient){

	function addWeightSample(_id, rate, callback){
		
 		OldPatient.findByIdAndUpdate(_id, 
								  {$push : 
									  {weightSamples:{rate : rate}}
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
		addWeightSample:addWeightSample 
	};
 });

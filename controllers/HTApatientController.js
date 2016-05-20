 module.exports = (function(HTAPatient){

	function addTensionSample(_id, rate, callback){
 		HTAPatient.findByIdAndUpdate(_id, 
								  {$push : 
									  {tensionSamples:{rate : rate}}
								  },
								  {safe: true,  new : true},
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
		addTensionSample : addTensionSample
	};
 });

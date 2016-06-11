var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');

var Schema = mongoose.Schema;
var UserSchema = new Schema({ 
	name: String, 
	password: String, 
	email : String,
	admin: Boolean 
}, {collection : 'users', discriminatorKey : '_type'});


var DoctorSchema = UserSchema.extend({
	patients : [{ type : mongoose.Schema.Types.ObjectId, ref : 'Patient' }],
  rendezVous : [{
    date : Date,
    hour : Number,
    minute : Number,
    patient : {type : mongoose.Schema.Types.ObjectId, ref: 'Patient'}
  }]
});


var PatientSchema = UserSchema.extend({
	doctors : [{ type : mongoose.Schema.Types.ObjectId, ref : 'Doctor'} ],
  diagnostics : [{
    diagnostic : String,
    date : {type : Date, default : Date.now},
    doctor : {type : mongoose.Schema.Types.ObjectId, ref : 'Doctor'}
  }],
  rendezVous : [{
    date : Date,
    hour : Number,
    minute : Number,
    doctor: {type : mongoose.Schema.Types.ObjectId, ref: 'Doctor'}
  }],
  medicaments : [{
    medicament : String,
    frequency : String
  }]
});	

var DiabetePatientSchema = PatientSchema.extend({
	sugarSamples : [{
		rate : Number ,
		rateDate : {type : Date , default : Date.now}
	}]
});

var HTAPatientSchema = PatientSchema.extend({
	tensionSamples : [{
		rate : Number ,
		rateDate : {type : Date , default : Date.now}
	}]
});
	
var OldPatientSchema = PatientSchema.extend({
	tensionSamples : [{
		rate : Number ,
		rateDate : {type : Date , default : Date.now}
	}],
	sugarSamples : [{
		rate : Number ,
		rateDate : {type : Date , default : Date.now}
	}],
	weightSamples : [{
		rate : Number,
		rateDate : {type : Date, default : Date.now}
	}]
});


// set up a mongoose model
var Patient = mongoose.model('Patient', PatientSchema);
var DiabetePatient = mongoose.model('DiabetePatient', DiabetePatientSchema); 
var HTAPatient = mongoose.model('HTAPatient', HTAPatientSchema);
var OldPatient = mongoose.model('OldPatient', OldPatientSchema);
var Doctor = mongoose.model('Doctor', DoctorSchema);
var User = mongoose.model('User',UserSchema);

module.exports = {
	Patient : mongoose.model('Patient', PatientSchema),
	DiabetePatient : mongoose.model('DiabetePatient', DiabetePatientSchema), 
	HTAPatient :mongoose.model('HTAPatient', HTAPatientSchema),
	OldPatient : mongoose.model('OldPatient', OldPatientSchema),
	Doctor : mongoose.model('Doctor', DoctorSchema),
	User : mongoose.model('User',UserSchema) 
};

// var p = new  Doctor({
// 	name : 'hakim',
// 	password : 'hakim',
// 	email : 'hakim@esi.dz'
// });
//
// 	p.save(function(err, u) {
// 		if (err) throw err;
//
// 		console.log('User saved successfully');
// 		console.log(u);
// 	});
// Doctor.findOne({_id : "57379ed8bca0462c0154b5b4"}).populate('patients').exec(function(err, doctor){
// 	console.log(doctor.patients);
// });
		   
// var p = new DiabetePatient({
//
// 	name : 'karim1',
// 	password : 'karim1',
// 	email : 'karim1@esi.dz'
//
// });
// p.save(function(err, u){
// console.log(u);
// });
//

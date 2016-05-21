

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SignalSchema = new Schema({
	patient : { type : mongoose.Schema.Types.ObjectId, ref : 'Patient' },
	carType : String, 
  source : String,
  destination : String,
	reservationDate : Date,
  withAssistant : Boolean
}, {collection : 'reservations'});


module.exports = mongoose.model('Signal', SignalSchema); 

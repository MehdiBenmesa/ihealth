
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ReservationSchema = new Schema({
	patient : { type : mongoose.Schema.Types.ObjectId, ref : 'Patient' },
	carType : String, 
  source : String,
  destination : String,
	reservationDate : Date,
  withAssistant : Boolean
}, {collection : 'reservations'});


module.exports = mongoose.model('Reservation', ReservationSchema); 
// var Reservation = mongoose.model('Reservation', ReservationSchema);
// var reservation = new Reservation({
//   patient : '5737b55e784bd68730b4ad4b',
//   carType : 'honda',
//   source : 'allhamise',
//   destination : 'Alger Centre',
//   reservationDate : new Date(),
//   withAssistant : false 
// });
// reservation.save(function(err, reservation){
//   if(err) throw err;
//   
//   console.log(reservation);
// });


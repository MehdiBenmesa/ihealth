module.exports = (function(Reservation){
  function addReservation(r, callback) {
    var reservation = new Reservation(r);
     reservation.save(reservation , function (err, reservation) {
        if(err) throw err;
        callback(reservation);
     });
  }

  function getAllReservation(callback){
      Reservation.find({}, function(err, reservations) {
          if(err) throw err;
          callback(reservations);
      }); 
  }

  function findReservationsById(patientId, callback) {
      Reservation.find({patient : patientId}, function(err, reservations){
        if(err) throw err;
        callback(reservations);
      });
  }
  
  return {
    addReservation : addReservation,
    getAllReservation : getAllReservation,
    findReservationsById : findReservationsById
  }
 });

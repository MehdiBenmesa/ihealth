module.exports = ( function(express, ReservationController){
	var reservationRoute= express.Router(); 

  reservationRoute.post('/newreservation', function (req, res) {
      ReservationController.addReservation(req.body, function(reservation) {
          res.json(reservation);
      });
  });

  reservationRoute.get('/allreservations', function(req, res) {
        ReservationController.getAllReservation(function(reservations) {
            res.json(reservations);
        });
  });

  reservationRoute.get('/reservation/:id', function(req, res) {
      ReservationController.findReservationsById(req.params.id, function(reservations) {
          res.json(reservations);
      });
  });
	return reservationRoute;

});

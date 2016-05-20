module.exports =( function(express, app, userController, jwt){
	var userRoute = express.Router(); 


	userRoute.post('/authenticate', function(req, res) {

		// find the user
		userController.authenticate(req.body, function(result){
			res.json(result);
		});

	});

	userRoute.use(function(req, res, next) {

		// check header or url parameters or post parameters for token
		var token = req.body.token || req.param('token') || req.headers['x-access-token'];

		// decode token
		if (token) {

			// verifies secret and checks exp
			jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
				if (err) {
					return res.json({ success: false, message: 'Failed to authenticate token.' });		
				} else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;	
					next();
				}
			});

		} else {

			// if there is no token
			// return an error
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.'
			});
			
		}
		
	});


	// ---------------------------------------------------------
	// authentication (no middleware necessary since this isnt authenticated)
	// ---------------------------------------------------------
	// http://localhost:8080/api/authenticate
// ---------------------------------------------------------
	userRoute.get('/', function(req, res) {
		res.json({ message: 'Welcome to the coolest API on earth!' });
	});

	userRoute.get('/users', function(req, res) {
		userController.getAllUsers( function(results) {

			res.json(results);
		});
	});

	userRoute.get('/check', function(req, res) {
		res.json(req.decoded);
	});


	// ---------------------------------------------------------
	// route middleware to authenticate and check token
	// ---------------------------------------------------------
	return userRoute;

});

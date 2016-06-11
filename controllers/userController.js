module.exports = (function(app, User, jwt) {

	function authenticate(o, cb){

		User.findOne({
			name: o.name
		}, function(err, user) {

			if (err) throw err;

			if (!user) {
				cb({ success: false, message: 'Authentication failed. User not found.' });
			} else if (user) {

				// check if password matches
				if (user.password != o.password) {
			    	cb({ success: false, message: 'Authentication failed. Wrong password.' });
				} else {

					// if user is found and password is right
					// create a token
					var token = jwt.sign(user, app.get('superSecret'), {
						expiresIn: 86400 // expires in 24 hours
					});

					cb({
						success: true,
						message: 'Enjoy your token!',
						token: token,
            user : user
					});
				}		

			}

		});

	}
	
	function getAllUsers(cb) {

		User.find({}, function(err, users) {
	     	cb(users);
		});
	}
	return {
		authenticate : authenticate,
		getAllUsers : getAllUsers
	};


});

// =================================================================
// =================================================================
// get the packages we need ========================================
// =================================================================
var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var path = require('path');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./app/models/user.js').User; // get our mongoose model
var Reservation = require('./app/models/reservation.js');
var Patient = require('./app/models/user.js').Patient;
var HTAPatient = require('./app/models/user.js').HTAPatient;
var DiabetePatient = require('./app/models/user.js').DiabetePatient;
var OldPatient = require('./app/models/user.js').OldPatient;
var Doctor = require('./app/models/user.js').Doctor;
var userController = require('./controllers/userController.js')(app, User, jwt);
var PatientController = require('./controllers/PatientController.js')(Patient, Doctor);
var DiabetePatientController = require('./controllers/DiabetPatientController.js')(DiabetePatient);
var HTAPatientController = require('./controllers/HTApatientController.js')(HTAPatient);
var OldPatientController = require('./controllers/OldPatientController.js')(OldPatient);
var DoctorController = require('./controllers/DoctorController.js')(Doctor, Patient);
var ReservationController = require('./controllers/ReservationController.js')(Reservation);
var userRoute = require('./routes/userRoute.js')(express, app, userController, jwt);
var patientRoute = require('./routes/patientRoute.js')(express, PatientController, HTAPatientController, DiabetePatientController, OldPatientController);
var doctorRoute = require('./routes/doctorRoute.js')(express, DoctorController);
var reservationRoute = require('./routes/reservationRoute.js')(express, ReservationController);
// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
// =================================================================
// routes ==========================================================
// =================================================================
// basic route (http://localhost:8080)
app.get('/', function(req, res) {
	res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
app.use('/api', reservationRoute);
app.use('/api', userRoute);
app.use('/api/patient', patientRoute);
app.use('/api/praticien', doctorRoute);

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
// get the packages we need ========================================
// =================================================================

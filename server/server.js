const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const vehicleRouter = require('./routes/vehicle.router');
const staticDataRouter = require('./routes/static_data.router');
const searchRouter = require('./routes/search.router');
const rentalRouter = require('./routes/rental.router');
const geocodeRouter = require('./routes/geocode.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/vehicle', vehicleRouter);
app.use('/api/data', staticDataRouter);
app.use('/api/search', searchRouter);
app.use('/api/rental', rentalRouter);
app.use('/api/geocode', geocodeRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

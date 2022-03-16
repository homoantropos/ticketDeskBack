const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

const sequelize = require('./database/sequelize');

const userRoutes = require('./routes/user_routes');
const auditoriumSectionRoutes = require('./routes/auditorium_section_routes');
const seatRoutes = require('./routes/seat_routes');
const venueRoutes = require('./routes/venue_routes');

app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/api/user', userRoutes);
app.use('/api/section', auditoriumSectionRoutes);
app.use('/api/seat', seatRoutes);
app.use('/api/venue', venueRoutes);

sequelize.sync({alter: true})
    .then(
        () => console.log('DataBase connection established successfully.')
    ).catch(
    (err)=> console.log(err)
)

module.exports = app

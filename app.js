const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const passport = require('passport');

const sequelize = require('./database/sequelize');

// app.use(passport.initialize());
// require('./middleware/passport')(passport);
app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

sequelize.sync({alter: true})
    .then(
        () => console.log('DataBase connection established successfully.')
    ).catch(
    (err)=> console.log(err)
)

module.exports = app

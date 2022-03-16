const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Seat = sequelize.define(
    'seat', {
        venueHall: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: 'seat'
        },
        hallSection: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: 'seat'
        },
        row: {
            type: Sequelize.INTEGER,
            allowNull: true,
            unique: 'seat'
        },
        seatNumber: {
            type: Sequelize.INTEGER,
            allowNull: true,
            unique: 'seat'
        },
        typeOfSeat: {
            type: Sequelize.STRING,
            allowNull: false,
            default: 'regular'
        }
    }, {
        freezeTableName: true,
        timestamps: false
    }
)

module.exports = Seat

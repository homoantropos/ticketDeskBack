const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const Seat = require('./Seat')

const Theatre = sequelize.define(
    'theatre', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'theatre'
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'theatre'
        },
        town: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'theatre'
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'theatre'
        }
    }, {
        freezeTableName: true,
        timestamps: false
    }
)

Theatre.hasMany(Seat);
Seat.belongsToMany(Theatre, {as: 'Seats', through: 'TheatreSeats'});

Theatre.addScope('theatre', {
    attributes: {exclude: ['seatId']},
    include: [
        {model: Seat,
            attributes: {
                exclude: ['id']
            }
        },
    ]
})

module.exports = Theatre

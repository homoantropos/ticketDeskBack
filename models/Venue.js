const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const Seat = require('../models/Seat');

const Venue = sequelize.define('venue', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'venue'
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false
        },
        town: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'venue'
        },
        street: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'venue'
        },
        building: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'venue'
        },
        phones: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true
        },
        webSite: {
            type: Sequelize.STRING,
            allowNull: true
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });

Venue.addScope(
    'venue', {
        include: [
            {
                model: Seat, as: 'seats'
            }
        ]
    }
)

Venue.hasMany(Seat, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Venue.belongsToMany(Seat,
    {
        as: 'venue',
        through: 'VenueSeats',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

Seat.belongsToMany(
    Venue,
    {
        as: 'seats',
        through: 'VenueSeats',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }
);

module.exports = Venue



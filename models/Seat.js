const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const AuditoriumSection = require('../models/AuditoriumSection')

const Seat = sequelize.define(
    'seat', {
        row: {
            type: Sequelize.INTEGER,
            unique: 'seat'
        },
        placeNumber: {
            type: Sequelize.INTEGER,
            unique: 'seat'
        }
    }, {
        freezeTableName: true,
        timestamps: false
    }
)

Seat.belongsTo(AuditoriumSection, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

AuditoriumSection.hasMany(Seat, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
});

Seat.addScope('place', {
    attributes: {
        includes: [
            {
                model: AuditoriumSection,
                attributes: {
                    exclude: ['id', 'freezeTableName']
                }
            }
        ]
    }
})

module.exports = Seat

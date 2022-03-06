const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const AuditoriumSection = require('../models/AuditoriumSection')

const Seat = sequelize.define(
    'seat', {
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
        auditoriumSectionId: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
    attributes: {exclude: ['auditoriumSectionId']},
    include: [
        {
            model: AuditoriumSection,
            attributes: {
                exclude: ['id']
            }
        }
    ]
})

module.exports = Seat

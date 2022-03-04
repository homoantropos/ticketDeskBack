const Sequelize = require('sequelize');
const sequelize = require("../database/sequelize")


const AuditoriumSection = sequelize.define(
    'auditoriumSection', {
        sectionName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
    }, {
        freezeTableName: true,
        timestamps: false
    }
)

module.exports = AuditoriumSection

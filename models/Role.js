const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const User = require('./User');

const Role = sequelize.define(
    'role', {
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'role'
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'role'
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Role

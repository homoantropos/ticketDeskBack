const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const User = sequelize.define(
    'user',
    {
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            default: 'user'
        }
    })

module.exports = User

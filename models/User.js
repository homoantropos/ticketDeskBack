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
        birthday: {
          type: Sequelize.DATE,
          allowNull: false
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            default: 'user'
        },
        phoneNumber:{
          type: Sequelize.STRING,
          allowNull: true
        },
        profilePictureSrc: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })

module.exports = User


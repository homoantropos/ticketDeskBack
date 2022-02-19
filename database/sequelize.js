const {Sequelize} = require('sequelize');
const keys = require('../config/keys');

const sequelize = new Sequelize(keys.dbName, keys.dbUser, keys.dbPwd, {
    host: keys.dbHost,
    port: keys.dbPort,
    dialect: 'postgres',
    define: {
        freezeTableName: true,
        timestamps: false
    },
    logging: false,
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false
    //     }
    // }
})

module.exports = sequelize

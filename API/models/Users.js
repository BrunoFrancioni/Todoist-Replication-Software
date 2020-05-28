const Sequelize = require('sequelize');

const db = require('../config/database');

const Users = db.define('users', {
    name: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true,
        isEmail: true
    }
});

module.exports = Users;
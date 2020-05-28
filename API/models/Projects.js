const Sequelize = require('sequelize');

const db = require('../config/database');

const Users = require('./Users');

const Projects = db.define('projects', {
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'idUser',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    title: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    archived: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = Projects;
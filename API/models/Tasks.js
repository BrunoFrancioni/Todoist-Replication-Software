const Sequelize = require('sequelize');

const db = require('../config/database');

const Users = require('./Users');
const Projects = require('./Projects');

const Tasks = db.define('tasks', {
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'idUser',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    idProject: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Projects,
            key: 'idProject',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    title: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    done: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    day: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    time: {
        type: Sequelize.TIME,
        allowNull: true
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = Tasks;
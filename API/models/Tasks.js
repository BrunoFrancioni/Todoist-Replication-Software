const Sequelize = require('sequelize');

const db = require('../config/database');

const Users = require('./Users');
const Projects = require('./Projects');

const Tasks = db.define('tasks', {
    idtask: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    iduser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'iduser',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    idproject: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Projects,
            key: 'idproject',
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
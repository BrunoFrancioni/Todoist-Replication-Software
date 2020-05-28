const Sequelize = require('sequelize');

const db = require('../config/database');

const Tasks = require('./Tasks');
const Tags = require('./Tags');

const TasksTagged = db.define('tasksTagged', {
    idtasktagged: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idtask: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Tasks,
            key: 'idtask',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    idtag: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Tags,
            key: 'idtag',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
});

module.exports = TasksTagged;
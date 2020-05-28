const Sequelize = require('sequelize');

const db = require('../config/database');

const Tasks = require('./Tasks');
const Tags = require('./Tags');

const TasksTagged = db.define('tasksTagged', {
    idTask: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Tasks,
            key: 'idTask',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    idTag: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Tags,
            key: 'idTag',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
});

module.exports = TasksTagged;
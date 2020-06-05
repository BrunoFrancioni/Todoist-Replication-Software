'use strict';

const tasks = require('./tasks');
const tags = require('./tags');

module.exports = (sequelize, DataTypes) => {
  const TasksTagged = sequelize.define('TasksTagged', {
    idtasktagged: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    idtask: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idtag: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    tableName: 'taskstagged'
  });

  TasksTagged.associate = function(models) {
    TasksTagged.belongsTo(models.Tasks, {
      foreignKey: 'idtask',
      targetKey: 'idtask'
    });
    TasksTagged.belongsTo(models.Tags, {
      foreignKey: 'idtag',
      targetKey: 'idtag'
    });
  };
  
  return TasksTagged;
};
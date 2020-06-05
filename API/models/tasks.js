'use strict';

const users = require('./users');
const projects = require('./projects');

module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    idtask: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    iduser: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idproject: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    day: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: true
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
  }, {
    tableName: 'tasks'
  });

  Tasks.associate = function(models) {
    Tasks.belongsTo(models.Users, {
      foreignKey: 'iduser',
      targetKey: 'iduser'
    });
    Tasks.belongsTo(models.Projects, {
      foreignKey: 'idproject',
      targetKey: 'idproject'
    });
    Tasks.belongsToMany(models.Tags, {
      through: models.TasksTagged,
      foreignKey: 'idtask',
      otherKey: 'idtag'
    });
  };

  return Tasks;
};
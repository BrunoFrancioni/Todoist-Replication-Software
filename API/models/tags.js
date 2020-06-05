'use strict';

const users = require('./users');
const tasks = require('./tasks')
const taskstagged = require('./taskstagged');

module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define('Tags', {
    idtag: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    iduser: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tagname: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
  }, {
    tableName: 'tags'
  });

  Tags.associate = function(models) {
    Tags.belongsTo(models.Users, {
      foreignKey: 'iduser',
      targetKey: 'iduser'
    });
    Tags.belongsToMany(models.Tasks, {
      through: models.TasksTagged,
      foreignKey: 'idtag',
      otherKey: 'idtask'
    });
  };

  return Tags;
};
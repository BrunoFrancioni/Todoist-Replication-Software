'use strict';
module.exports = (sequelize, DataTypes) => {
  const tasks = sequelize.define('tasks', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    done: DataTypes.BOOLEAN,
    day: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    deleted: DataTypes.BOOLEAN
  }, {});
  tasks.associate = function(models) {
    // associations can be defined here
  };
  return tasks;
};
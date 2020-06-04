'use strict';
module.exports = (sequelize, DataTypes) => {
  const taskstagged = sequelize.define('taskstagged', {
    idtask: DataTypes.INTEGER,
    idtag: DataTypes.INTEGER
  }, {});
  taskstagged.associate = function(models) {
    // associations can be defined here
  };
  return taskstagged;
};
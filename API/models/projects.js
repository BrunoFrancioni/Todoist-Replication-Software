'use strict';
module.exports = (sequelize, DataTypes) => {
  const projects = sequelize.define('projects', {
    title: DataTypes.STRING,
    archived: DataTypes.BOOLEAN
  }, {});
  projects.associate = function(models) {
    // associations can be defined here
  };
  return projects;
};
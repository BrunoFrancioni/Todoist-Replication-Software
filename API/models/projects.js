'use strict';

const users = require('./users');

module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define('Projects', {
    idproject: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    iduser: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    archived: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
  }, {
    tableName: 'projects'
  });

  Projects.associate = function(models) {
    Projects.belongsTo(models.Users, {
      foreignKey: 'iduser',
      targetKey: 'iduser'
    });
    Projects.hasMany(models.Tasks, {
      foreignKey: 'idproject',
      sourceKey: 'idproject'
    });
  };

  return Projects;
};
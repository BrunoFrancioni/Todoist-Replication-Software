'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    iduser: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  }, {
    tableName: 'users'
  });

  Users.associate = function(models) {
    Users.hasMany(models.Tasks, {
      sourceKey: 'iduser',
      foreignKey: 'iduser'
    });
    Users.hasMany(models.Tags, {
      sourceKey: 'iduser',
      foreignKey: 'iduser'
    });
    Users.hasMany(models.Projects, {
      sourceKey: 'iduser',
      foreignKey: 'iduser'
    });
  }

  return Users;
};
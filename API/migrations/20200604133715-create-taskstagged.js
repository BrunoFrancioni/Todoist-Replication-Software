'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('taskstaggeds', {
      idtasktagged: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idtask: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: tasks,
            key: 'idtask'
        }
      },
      idtag: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: tags,
            key: 'idtag'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('taskstaggeds');
  }
};
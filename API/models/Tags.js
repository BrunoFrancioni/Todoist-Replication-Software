const Sequelize = require('sequelize');

const db = require('../config/database');

const Users = require('./Users');

const Tags = db.define('tags', {
    idtag: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    iduser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'idUser',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    tagname: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
});

module.exports = Tags;
const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasksController');

module.exports = () => {
    router.get('/', (req, res) => {
        res.status(200).json({
            "Estado": "Funcionando"
        });
    });

    router.post('/', (req, res) => {
        res.status(200).json({
            "Estado": "Funcionando"
        });
    });

    return router;
}
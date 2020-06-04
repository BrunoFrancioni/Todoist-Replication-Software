const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasksController');

module.exports = () => {
    router.post('/', tasksController.createTask);

    router.get('/:iduser', tasksController.getTasksOfUser);

    router.get('', tasksController.getTasksOfProject);

    router.delete('/:idtask', tasksController.DeleteTask);

    return router;
}
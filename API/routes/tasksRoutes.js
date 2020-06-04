const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasksController');

module.exports = () => {
    router.post('/', tasksController.createTask);

    router.get('/users/:iduser', tasksController.getTasksOfUser);

    router.get('/projects/:idproject', tasksController.getTasksOfProject);

    router.put('/:idtask', tasksController.UpdateTask);

    router.delete('/:idtask', tasksController.DeleteTask);

    return router;
}
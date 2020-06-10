const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasksController');
const checkAuto = require('../middleware/check-auth');

module.exports = () => {
    router.post('/', checkAuto, tasksController.createTask);

    router.get('/users/:iduser', checkAuto, tasksController.getTasksOfUser);

    router.get('/projects/:idproject', checkAuto, tasksController.getTasksOfProject);

    router.put('/:idtask', checkAuto, tasksController.UpdateTask);

    router.delete('/:idtask', checkAuto, tasksController.DeleteTask);

    return router;
}
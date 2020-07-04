const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasksController');
const checkAuto = require('../middleware/check-auth');

module.exports = () => {
    router.post('/', checkAuto, tasksController.createTask);

    router.get('/users/:iduser/today', checkAuto, tasksController.getTodayUserTasks);

    router.get('/users/:iduser/inbox', checkAuto, tasksController.getInboxUserTasks);

    router.get('/users/:iduser/upcoming', checkAuto, tasksController.getUpcomingUserTasks);

    router.get('/users/:iduser/deleted', checkAuto, tasksController.getDeletedUserTasks);

    router.get('/projects/:idproject', checkAuto, tasksController.getTasksOfProject);

    router.put('/:idtask', checkAuto, tasksController.UpdateTask);

    router.delete('/:idtask', checkAuto, tasksController.DeleteTask);

    return router;
}
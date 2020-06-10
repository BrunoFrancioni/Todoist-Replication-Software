const express = require('express');
const router = express.Router();

const tasksTaggedController = require('../controllers/tasksTaggedController');
const checkAuto = require('../middleware/check-auth');

module.exports = () => {
    router.post('/', checkAuto, tasksTaggedController.CreateTaskTagged);

    router.delete('/:idtasktagged', checkAuto, tasksTaggedController.DeleteTaskTagged);

    return router;
}
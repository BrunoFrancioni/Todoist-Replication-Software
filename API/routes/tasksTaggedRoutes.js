const express = require('express');
const router = express.Router();

const tasksTaggedController = require('../controllers/tasksTaggedController');

module.exports = () => {
    router.post('/', tasksTaggedController.CreateTaskTagged);

    router.delete('/:idtasktagged', tasksTaggedController.DeleteTaskTagged);

    return router;
}
const express = require('express');
const router = express.Router();

const projectsController = require('../controllers/projectsController');

module.exports = () => {
    router.post('/', projectsController.CreateProject);

    router.get('/:iduser', projectsController.GetProjectsOfAUser);

    router.get('?idproject=', projectsController.GetProjectTasks);

    router.put('/:idproject', projectsController.EditProject);

    router.delete('/:idproject', projectsController.DeleteProject);

    return router;
}
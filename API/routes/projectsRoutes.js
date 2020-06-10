const express = require('express');
const router = express.Router();

const projectsController = require('../controllers/projectsController');
const checkAuto = require('../middleware/check-auth');

module.exports = () => {
    router.post('/', checkAuto, projectsController.CreateProject);

    router.get('/:iduser', checkAuto, projectsController.GetProjectsOfAUser);

    router.put('/:idproject', checkAuto, projectsController.EditProject);

    router.delete('/:idproject', checkAuto, projectsController.DeleteProject);

    return router;
}
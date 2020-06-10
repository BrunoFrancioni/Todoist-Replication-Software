const models = require('../models/index');

const tasksController = require('../controllers/tasksController');

exports.CreateProject = async (req, res) => {
    const { iduser, title } = req.body;

    if(!iduser || !title) {
        return res.status(400).json({
            message: 'User ID and title of the project are required.'
        });
    }

    try {
        const user = await models.Users.findByPk(iduser);

        if(user === null) {
            return res.status(400).json({
                message: 'User ID not found.'
            });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }

    try {
        const result = await models.Projects.create({
            iduser: iduser,
            title: title,
            archived: false
        });

        console.log(result);

        res.status(201).json({
            message: 'Project created.',
            createdProject: {
                idproject: result.idproject,
                iduser: result.iduser,
                title: result.title,
                archived: result.archived
            }
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

exports.GetProjectsOfAUser = async (req, res) => {
    try {
        const user = await models.Users.findByPk(req.params.iduser);

        if(user === null) {
            return res.status(400).json({
                message: 'User ID not found.'
            });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }

    try {
        const projects = await models.Projects.findAll({
            where: {
                iduser: req.params.iduser,
                archived: (req.query.archived) ? req.query.archived : false
            }
        });

        res.status(200).json({
            projects
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

exports.EditProject = async (req, res) => {
    const { title, archived } = req.body;

    if(!title && !archived) {
        return res.status(400).json({
            message: 'Nothing to change.'
        });
    }

    try {
        const project = await models.Projects.findByPk(req.params.idproject);

        if(project === null) {
            return res.status(400).json({
                message: 'Project ID not found.'
            });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }

    let toUpdate = {};

    if(title) toUpdate.title = title;
    if(archived) toUpdate.archived = archived;

    try {
        const result = await models.Projects.update(toUpdate, { where: { idproject: req.params.idproject } });

        console.log(result);
        res.status(200).json({
            message: 'Project updated.'
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

exports.DeleteProject = async (req, res) => {
    try {
        const project = await models.Projects.findByPk(req.params.idproject);

        if(project === null) {
            return res.status(400).json({
                message: 'Project ID not valid.'
            });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }

    const deleteTasks = await tasksController.DeleteTasksOfAProject(req.params.idproject);

    if(!deleteTasks.result) {
        return res.status(500).json({
            message: deleteTasks.message
        });
    }

    try {
        const result = await models.Projects.destroy({ where: { idproject: req.params.idproject } });

        console.log(result);
        res.status(200).json({
            message: 'Project deleted.'
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

exports.DeleteProjectsOfAUser = async (iduser) => {
    try {
        let userProjects = await models.Projects.findAll({ attributes: ['idproject'], where: { iduser: iduser } });

        if(userProjects.length === 0) {
            return ({
                result: true
            });
        }

        string = JSON.stringify(userProjects);
        console.log(userProjects);
        userProjects = JSON.parse(string);
        console.log(userProjects);

        userProjects.forEach(async (project) => {
            const deleteProjects = await models.Projects.destroy({ where: { idproject: project.idproject } });

            console.log(deleteProjects);
        });

        return ({
            result: true
        });
    } catch(error) {
        console.log(error);
        return ({
            result: false,
            message: error
        });
    }
}
const Projects = require('../models/Projects');
const Users = require('../models/Users');
const Tasks = require('../models/Tasks');

const tasksController = require('../controllers/tasksController');

exports.CreateProject = async (req, res) => {
    const { iduser, title } = req.body;

    if(!iduser || !title) {
        return res.status(400).json({
            message: 'User ID and title of the project are required.'
        });
    }

    try {
        const user = await Users.findByPk(iduser);

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
        const result = await Projects.create({
            iduser: iduser,
            title: title,
            archived: false
        });

        console.log(result);

        res.status(201).json({
            message: 'Project created.'
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
        const archivedProjects = await Projects.findAll({ where: { archived: false } });

        res.status(200).json({
            archivedProjects
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

exports.GetArchivedProjectsOfAUser = async (req, res) => {
    try {
        const archivedProjects = await Projects.findAll({ where: { archived: true } });

        res.status(200).json({
            archivedProjects
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

exports.GetProjectTasks = async (req, res) => {
    try {
        const project = await Projects.findByPk(req.query.idproject);

        if(project === null) {
            return res.status(400).josn({
                message: 'Project ID invalid.'
            });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }

    try {
        const tasks = await Tasks.findAll({
            where: {
                deleted: false
            },
            include: [{
                model: TasksTagged
            }]
        });

        res.status(200).json({
            tasks
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
        const project = await Projects.findByPk(req.params.idproject);

        if(project === null) {
            return res.status(400).json({
                message: 'roject ID not found.'
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
        const result = await Projects.update(toUpdate, { where: { idproject: req.params.idproject } });

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
        const project = await Projects.findByPk(req.params.idproject);

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

    if(tasksController.DeleteTasksOfAProject(req.params.idproject) === false) {
        return res.status(500);
    }

    try {
        const result = await Projects.destroy({ where: { idproject: idproject } });

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
const models = require('../models/index');
const Op = models.Sequelize.Op;

const tasksTaggedController = require('./tasksTaggedController');

exports.createTask = async (req, res) => {
    const { iduser, idproject, title, content, day, time } = req.body;

    if(!iduser || !title || !day) {
        return res.status(400).json({
            message: 'User ID, Title and Day are required.'
        });
    }

    try {
        const user = await models.Users.findByPk(req.body.iduser);

        if(user === null) {
            return res.status(400).json({
                message: 'User ID not valid.'
            });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }

    if(idproject) {
        try {
            const project = await models.Projects.findByPk(idproject);
    
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
    }

    try {
        const result = await models.Tasks.create({
            iduser: iduser,
            idproject: (idproject) ? idproject : null,
            title: title,
            content: (content) ? content : null,
            done: false,
            day: day,
            time: (time) ? time : null,
            deleted: false
        });

        console.log(result);
        res.status(201).json({
            message: 'Task created.',
            createdTask: {
                idtask: result.idtask,
                iduser: result.iduser,
                idproject: result.idproject,
                title: result.title,
                content: result.content,
                done: result.done,
                day: result.day,
                time: result.time,
                deleted: result.deleted
            }
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }
}

exports.getTasksOfUser = async (req, res) => {
    try {
        const user = await models.Users.findByPk(req.params.iduser);

        if(user === null) {
            return res.status(400).json({
                message: 'User ID not valid.'
            });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }
    
    let whereParams = {};

    if(req.query.project === 'true') {
        whereParams = {
            iduser : req.params.iduser,
            deleted : (req.query.deleted === 'true') ? true : false,
            day: {
                [Op.gte]: `${res.locals.actualDate.toISOString().slice(0,10)}`
            }
        }
    } else {
        whereParams = {
            iduser : req.params.iduser,
            idproject : null,
            deleted : (req.query.deleted === 'true') ? true : false,
            day: {
                [Op.gte]: `${res.locals.actualDate.toISOString().slice(0,10)}`
            }
        }
    }

    try {
        const tasks = await models.Tasks.findAll({
            where: whereParams,
            include: [{
                model: models.Tags
            }, {
                model: models.Projects
            }],
            order: [
                ['day', 'ASC']
            ]
        });

        if(tasks === null) {
            return res.status(404).json({
                message: 'Tasks not found.'
            });
        }

        return res.status(200).json({
            tasks
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }
}

exports.getTasksOfProject = async (req, res) => {
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

    try {
        const tasks = await models.Tasks.findAll({
            where: {
                idproject: req.params.idproject,
                deleted: (req.query.deleted) ? req.query.deleted : false
            },
            include: [{
                model: models.Tags
            }],
            order: [
                ['day', 'ASC']
            ]
        });

        if(tasks === null) {
            return res.status(404).json({
                message: 'Tasks not found.'
            });
        }

        return res.status(200).json({
            tasks
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }
}

exports.DeleteTask = async (req, res) => {
    try {
        const tasks = await models.Tasks.findByPk(req.params.idtask);

        if(tasks === null) {
            return res.status(400).json({
                message: 'Task ID not valid.'
            });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }

    try{
        const result = await models.Tasks.update({ deleted: true }, { where: { idtask: req.params.idtask } });

        console.log(result);
        res.status(200).json({
            message: 'Task deleted.'
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }
}

exports.UpdateTask = async (req, res) => {
    const { idproject, title, content, done, day, time } = req.body;
    
    let toUpdate = {};

    if(idproject !== undefined) toUpdate.idproject = idproject;

    if(title) toUpdate.title = title;

    if(content !== undefined) {
        if(content === "") {
            toUpdate.content = null;
        } else {
            toUpdate.content = content;
        }
    }

    if(done) toUpdate.done = done;

    if(day) toUpdate.day = day;

    if(time !== undefined) toUpdate.time = time;
    
    if(Object.keys(toUpdate).length === 0){
        return res.status(400).json({
            message: 'Nothing to change.'
        });
    }

    try{
        const result = models.Tasks.update(toUpdate, { where: { idtask: req.params.idtask } });

        console.log(result);
        res.status(200).json({
            message: 'Task updated.'
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }
}

exports.DeleteTasksOfAProject = async (idproject) => {
    try {
        let tasks = await models.Tasks.findAll({ attributes: ['idtask'], where: { idproject: idproject } });

        if(tasks.length === null) {
            return ({
                result: true
            });
        }

        string = JSON.stringify(tasks);
        console.log(string);
        tasks = JSON.parse(string);
        console.log(tasks);

        tasks.forEach(async (task) => {
            const deleteTasksTagged = await tasksTaggedController.DeleteAllTagsOfATask(task.idtask);

            if(!deleteTasksTagged.result) {
                return ({
                    result: false,
                    message: deleteTasksTagged.message
                });
            }

            const deleteTasks = await models.Tasks.destroy({ where: { idtask: task.idtask } });

            console.log(deleteTasks);
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

exports.DeleteTasksOfAUser = async (iduser) => {
    try {
        let tasks = await models.Tasks.findAll({ attributes: ['idtask'], where: { iduser: iduser } });

        if(tasks.length === 0) {
            return ({
                result: true
            });
        }

        string = JSON.stringify(tasks);
        console.log(string);
        tasks = JSON.parse(string);
        console.log(tasks);

        tasks.forEach(async (task) => {
            const deleteTasksTagged = await tasksTaggedController.DeleteAllTagsOfATask(task.idtask);

            if(!deleteTasksTagged.result) {
                return ({
                    result: false,
                    message: deleteTasksTagged.message
                });
            }

            const deleteTasks = await models.Tasks.destroy({ where: { idtask: task.idtask } });

            console.log(deleteTasks);
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
const models = require('../models/index');

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
            message: 'Task created.'
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

    try {
        const tasks = await models.Tasks.findAll({
            where: {
                iduser: req.params.iduser,
                deleted: (req.query.deleted) ? req.query.deleted : false
            },
            include: [{
                model: models.Tags
            }]
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
            }]
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

    if(!title) toUpdate.title = title;

    if(content !== undefined) {
        if(content === "") {
            toUpdate.content = null;
        } else {
            toUpdate.content = content;
        }
    }

    if(!done) toUpdate.done = done;

    if(!day) toUpdate.day = day;

    if(time !== undefined) toUpdate.time = time;

    if(Object.keys(toUpdate).length === 0){
        return res.status(400).json({
            message: 'Nothing to change.'
        });
    }

    try{
        const result = models.Tasks.update(toUpdate, { where: { iduser: req.params.idtask } });

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
        const tasks = await models.Tasks.findAll({ where: { idproject: idproject } });

        if(tasks === null) {
            return ({
                result: true
            });
        }

        tasks.forEach(async (task) => {
            const deleteTaskTagged = await tasksTaggedController.DeleteAllTagsOfATask(task.idtask);

            if(!deleteTaskTagged.result) {
                return ({
                    result: false,
                    message: deleteTaskTagged.message
                });
            }
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
const Tasks = require('../models/Tasks');
const Users = require('../models/Users');
const Projects = require('../models/Projects');
const TasksTagged = require('../models/TasksTagged');
const Tags = require('../models/Tags');

const tasksTaggedController = require('../controllers/tasksTaggedController');

exports.createTask = async (req, res) => {
    const { iduser, idproject, title, content, day, time } = req.body;

    if(!iduser || !title || !day) {
        return res.status(400).json({
            message: 'User ID, Title and Day are required.'
        });
    }

    try {
        const user = await Users.findByPk(req.body.iduser);

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
            const project = await Projects.findByPk(idproject);
    
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
        const result = await Tasks.create({
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
        const user = await Users.findByPk(req.params.iduser);

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
        if(req.query.deleted === true)  {
            const tasks = await Tasks.findAll({
                where: {
                    iduser: req.params.iduser,
                    deleted: true
                },
                include: [{
                    model: TasksTagged,
                    include: [{
                        model: Tags
                    }]
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
        } else {
            const tasks = await Tasks.findAll({
                where: {
                    iduser: req.params.iduser
                },
                include: [{
                    model: TasksTagged,
                    include: [{
                        model: Tags
                    }]
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
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }
}

exports.getTasksOfProject = async (req, res) => {
    try {
        const project = await Projects.findByPk(req.query.idproject);

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
        if(req.query.deleted === true)  {
            const tasks = await Tasks.findAll({
                where: {
                    idproject: req.query.idproject,
                    deleted: true
                },
                include: [{
                    TasksTagged
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
        } else {
            const tasks = await Tasks.findAll({
                where: {
                    idproject: req.query.idproject
                },
                include: [{
                    TasksTagged
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
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }
}

exports.DeleteTask = async (req, res) => {
    try {
        const tasks = await Tasks.findByPk(req.params.idtask);

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
        const result = await Tasks.update({ deleted: true }, { where: { idtask: req.params.idtask } });

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
        const result = Tasks.update(toUpdate, { where: { iduser: req.params.idtask } });

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
        const tasks = await Tasks.findAll({ where: { idproject: idproject } });

        if(tasks === null) {
            return ({
                result: true
            });
        }

        tasks.forEach(task => {
            const deleteTaskTagged = tasksTaggedController.DeleteAllTagsOfATask(task.idtask);

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
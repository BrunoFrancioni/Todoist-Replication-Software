const Tasks = require('../models/Tasks');
const Users = require('../models/Users');
const Projects = require('../models/Projects');

exports.createTask = (req, res) => {
    Users.findByPk(req.body.iduser)
        .then(user => {
            if(user === null) {
                return res.status(409).json({
                    message: 'User not found.'
                });
            } else {
                if(req.body.idproject === null || req.body.idproject === undefined) {
                    Tasks.create({
                        iduser: req.body.iduser,
                        idproject: null,
                        title: (req.body.title).charAt(0).toUppercase() + (req.body.title).slice(1),
                        content: (req.body.content !== undefined) ? req.body.content : null,
                        done: false,
                        day: req.body.day,
                        time: (req.body.time) ? req.body.time : null,
                        deleted: false
                    })
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Task created.'
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({
                            error
                        });
                    });
                } else {
                    Projects.findByPk(req.body.idproject)
                        .then(project => {
                            if(project === null) {
                                return res.status(409).json({
                                    message: 'Project not found.'
                                })
                            } else {
                                Tasks.create({
                                    iduser: req.body.iduser,
                                    idproject: req.body.idproject,
                                    title: (req.body.title).charAt(0).toUppercase() + (req.body.title).slice(1),
                                    content: (req.body.content !== undefined) ? req.body.content : null,
                                    done: false,
                                    day: req.body.day,
                                    time: (req.body.time) ? req.body.time : null,
                                    deleted: false
                                })
                                .then(result => {
                                    console.log(result);
                                    res.status(201).json({
                                        message: 'Task created.'
                                    });
                                })
                                .catch(error => {
                                    console.log(error);
                                    res.status(500).json({
                                        error
                                    });
                                });
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(500).json({
                                error
                            });
                        })
                }
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                error
            });
        });
}

exports.getTasksOfUser = (req, res) => {
    Tasks.findAll({ where: { iduser: req.params.iduser } })
        .then(tasks => {
            if(tasks === []) {
                return res.status(404).json({
                    message: 'Tasks not found.'
                });
            } else {
                res.status(200).json({
                    tasks
                });
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                error
            });
        });
}

exports.getTasksOfProject = (req, res) => {
    Tasks.findAll({ where: { idproject: req.body.idproject } })
        .then(tasks => {
            if(tasks === []) {
                return res.status(404).json({
                    message: 'Tasks not found.'
                })
            } else {
                res.status(200).json({
                    tasks
                });
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                error
            });
        });
}

exports.DeleteTask = (req, res) => {
    Tasks.destroy({ where: { idtask: req.body.idtask } })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Task deleted.'
            });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                error
            });
        });
}

exports.UpdateTask = (req, res) => {
    const { idproject, title, content, done, day, time, deleted} = req.body;

    const toUpdate = {};

    if(idproject !== undefined) toUpdate.idproject = idproject;

    if(title !== null && title !== undefined) toUpdate.title = title;

    if(content !== undefined) {
        if(content === "") {
            toUpdate.content = null;
        } else {
            toUpdate.content = content;
        }
    }

    if(done !== null && done !== undefined) toUpdate.done = done;

    if(day !== null && day !== undefined) toUpdate.day = day;

    if(time !== undefined) toUpdate.time = time;

    if(deleted !== null && deleted !== undefined) toUpdate.deleted = deleted;

    if(_.isEmpty(toUpdate)){
        res.status(400).json({
            message: 'Nothing to change.'
        });
    } else {
        Tasks.update(toUpdate, { where: { iduser: req.params.idtask } })
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: 'Task updated.'
                });
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({
                    error
                });
            });
    }
}
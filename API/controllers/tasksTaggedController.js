const TasksTagged = require('../models/TasksTagged');
const Tasks = require('../models/Tasks');
const Tags = require('../models/Tags');

exports.CreateTaskTagged = (req, res) => {
    const { idtask, idtag } = req.body;

    if(!idtask || !idtag) {
        return res.status(400).json({
            message: 'Task ID and Tag ID required.'
        });
    }

    Tasks.findByPk(idtask)
        .then(task => {
            if(task === null) {
                return res.status(400).json({
                    message: 'Task ID not valid.'
                });
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                error
            });
        });

    Tags.findByPk(idtag)
        .then(tag => {
            if(tag === null) {
                return res.status(400).json({
                    message: 'Tag ID not valid.'
                });
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                error
            });
        });

    TasksTagged.create({
        idtask, 
        idtag
    })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Task tagged created.'
            })
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                error
            });
        });
}

exports.DeleteTaskTagged = (req, res) => {
    TasksTagged.destroy({ where: { idtasktagged: idtasktagged } })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Task tagged deleted.'
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error
            });
        });
}

exports.DeleteTaskTaggedFromTag = (idtag) => {
    TasksTagged.destroy({ where: { idtag: idtag } })
        .then(result => {
            return true;
        })
        .catch(error => {
            console.log(error);
            return false;
        });
}

exports.DeleteAllTagsOfATask = async (idtask) => {
    try {
        const result = await TasksTagged.destroy({ where: { idtask: idtask } });

        console.log(result);
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
}
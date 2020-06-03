const TasksTagged = require('../models/TasksTagged');
const Tasks = require('../models/Tasks');
const Tags = require('../models/Tags');

exports.CreateTaskTagged = async (req, res) => {
    const { idtask, idtag } = req.body;

    if(!idtask || !idtag) {
        return res.status(400).json({
            message: 'Task ID and Tag ID required.'
        });
    }

    try {
        const task = await Tasks.findByPk(idtask);

        if(task === null) {
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

    try {
        const tag = await Tags.findByPk(idtag);

        if(tag === null) {
            return res.status(400).json({
                message: 'Tag ID not valid.'
            });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }

    try {
        const result = await TasksTagged.create({
            idtask, 
            idtag
        });

        console.log(result);
        res.status(201).json({
            message: 'Task tagged created.'
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }
}

exports.DeleteTaskTagged = async (req, res) => {
    try {
        const result = await TasksTagged.destroy({ where: { idtasktagged: req.params.idtasktagged } });

        console.log(result);
        res.status(200).json({
            message: 'Task tagged deleted.'
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

exports.DeleteTaskTaggedFromTag = async (idtag) => {
    try {
        const result = await TasksTagged.destroy({ where: { idtag: idtag } });

        console.log(result);
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
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
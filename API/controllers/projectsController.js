const Projects = require('../models/Projects');
const Users = require('../models/Users');

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
    
}

exports.EditProject = async(req, res) => {

}

exports.DeleteProject = async (req, res) => {

}
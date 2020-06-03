const Tags = require('../models/Tags');
const Users = require('../models/Users');

const tasksTaggedController = require('../controllers/tasksTaggedController');

exports.CreateTag = async (req, res) => {
    const { iduser, tagname } = req.body;

    if(!iduser || !tagname) {
        return res.status(400).json({
            message: 'User ID and tagname are required.'
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
        const result = await Tags.create({
            iduser: iduser,
            tagname: tagname
        });

        console.log(result);
        res.status(200).json({
            message: 'Tag created.'
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }
}

exports.GetTagsOfAUser = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.iduser);

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
        const tags = await Tags.findAll({ where: { iduser: req.params.iduser } });

        return res.status(200).json({
            tags
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }
}

exports.DeleteTag = async (req, res) => {
    const result = tasksTaggedController.DeleteTaskTaggedFromTag(req.params.idtag);

    if(result === false) {
        return res.status(500);
    }

    try {
        const result = await Tags.destroy({ where: { idtag: req.params.idtag } });

        if(result === 0) {
            return res.status(400).json({
                message: 'Tag ID not valid.'
            });
        }

        res.status(200).json({
            message: 'Tag deleted.'
        });
    } catch(error) {
        console.log(error);
            res.status(500).json({
                error
            });
    }
}
const models = require('../models/index');

const tasksTaggedController = require('../controllers/tasksTaggedController');

exports.CreateTag = async (req, res) => {
    const { iduser, tagname } = req.body;

    if(!iduser || !tagname) {
        return res.status(400).json({
            message: 'User ID and tagname are required.'
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
        const result = await models.Tags.create({
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
        const tags = await models.Tags.findAll({ where: { iduser: req.params.iduser } });

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
        const result = await models.Tags.destroy({ where: { idtag: req.params.idtag } });

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

exports.DeleteTagsOfAUser = async (iduser) => {
    try {
        let tags = await models.Tags.findAll({ attributes: ['idtag'], where: { iduser: iduser } });

        if(tags.length === 0) {
            return ({
                result: true
            });
        }
        
        let string = JSON.stringify(tags);
        console.log(string);
        tags = JSON.parse(string);
        console.log(tags);

        tags.forEach(async (tag) => {
            const deleteTagTagged = await tasksTaggedController.DeleteTaskTaggedFromTag(tag.idtag);

            if(!deleteTagTagged.result) {
                return ({
                    result: false,
                    message: deleteTagTagged.message
                });
            }

            const deleteTags = await models.Tags.destroy({ where: { idtag: tag.idtag } });

            console.log(deleteTags);
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
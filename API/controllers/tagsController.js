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
        const user = await models.Users.findByPk(parseInt(iduser));

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
            iduser: parseInt(iduser),
            tagname: tagname
        });

        console.log(result);
        res.status(201).json({
            message: 'Tag created.',
            createdTag: {
                idtag: result.idtag,
                iduser: result.iduser,
                tagname: result.tagname
            }
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
        const user = await models.Users.findByPk(parseInt(req.params.iduser));

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
        const tags = await models.Tags.findAll({ where: { iduser: parseInt(req.params.iduser) } });

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

exports.UpdateTag = async (req, res) => {
    const { tagname } = req.body;

    if(!tagname) {
        return res.status(400).json({
            message: 'Nothing to change.'
        });
    }

    try {
        const result = await models.Tags.update({
            tagname: tagname
        }, { where: {
            idtag: parseInt(req.params.idtag)
        }});

        console.log(result);
        return res.status(200).json({
            message: 'Tag updated.'
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
        const result = await models.Tags.destroy({ where: { idtag: parseInt(req.params.idtag) } });

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
        let tags = await models.Tags.findAll({ attributes: ['idtag'], where: { iduser: parseInt(iduser) } });

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

            const deleteTags = await models.Tags.destroy({ where: { idtag: parseInt(tag.idtag) } });

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
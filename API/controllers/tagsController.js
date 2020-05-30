const Tags = require('../models/Tags');
const Users = require('../models/Users');

const tasksTaggedController = require('../controllers/tasksTaggedController');

exports.CreateTag = (req, res) => {
    const { iduser, tagname } = req.body;

    if(!iduser || !tagname) {
        return res.status(400).json({
            message: 'User ID and tagname are required.'
        });
    }

    Users.findByPk(iduser)
        .then(user => {
            if(user === null) {
                return res.status(400).json({
                    message: 'User ID not found.'
                });
            } else {
                Tags.create({
                    iduser: user.iduser,
                    tagname: tagname
                })
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        message: 'Tag created.'
                    })
                })
                .catch(error => {
                    console.log(error);
                    return res.status(500).json({
                        error
                    });
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

exports.DeleteTag = (req, res) => {
    const result = tasksTaggedController.DeleteTaskTaggedFromTag(req.params.idtag);

    if(result === false) {
        return res.status(500);
    }

    Tags.destroy({ where: { idtag: res.params.idtag } })
        .then(result => {
            if(result === 0) {
                return res.status(400).json({
                    message: 'Tag ID not valid.'
                });
            }

            res.status(200).json({
                message: 'Tag deleted.'
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error
            });
        });
}
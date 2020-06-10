const models = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const tagsController = require('./tagsController');
const projectsController = require('./projectsController');
const tasksController = require('./tasksController');

exports.LoginUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({
            message: 'Email and password required.'
        });
    }

    try {
        const user = await models.Users.findOne({ where: { email: email } });

        if(user === null) {
            return res.status(401).json({
                message: 'Auth failed.'
            })
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: 'Auth failed.'
                });
            }

            if(result) {
                const token = jwt.sign({
                    email: user.email,
                    iduser: user.iduser,
                    name: user.name,
                    lastname: user.lastname
                }, process.env.JWT_KEY, {
                    expiresIn: "7d"
                });

                return res.status(200).json({
                    message: 'Auth successful.',
                    token
                });
            }

            res.status(401).json({
                message: 'Auth failed.'
            });
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }
}

exports.CreateUser = async (req, res) => {
    const { name, lastname, email, password } = req.body;

    if(!name || !lastname || !email || !password) {
        return res.status(400).json({
            message: 'Name, lastname, email and password are required.'
        });;
    }

    try {
        const user = await models.Users.findOne({ where: { email: email } });

        if(user !== null) {
            return res.status(409).json({
                message: 'User exists'
            });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            return res.status(500).json({
                err
            });
        } else {
            try {
                const result = await models.Users.create({
                    name: name.toUpperCase(),
                    lastname: lastname.toUpperCase(),
                    password: hash,
                    email: email
                });
        
                console.log(result);
        
                res.status(201).json({
                    message: 'User created.'
                })
            } catch(error) {
                console.log(error);
                return res.status(500).json({
                    error
                });
            }
        }
    });
}

exports.UpdateUser = async (req, res) => {
    const { name, lastname, newPassword, email, oldPassword } = req.body;

    let toUpdate = {};

    if(name) toUpdate.name = name.toUpperCase();
    if(lastname) toUpdate.lastname = lastname.toUpperCase();
    if(email) toUpdate.email = email;

    if((newPassword && !oldPassword) || (!newPassword && oldPassword)) {
        return res.status(400).json({
            message: 'New password and old password are required.'
        });
    }

    if(oldPassword && newPassword) {
        try {
            const user = await models.Users.findByPk(req.params.iduser);
    
            if(user === null) {
                return res.status(404).json({
                    message: 'User ID not valid.'
                });
            }
    
            bcrypt.compare(oldPassword, user.password, (err, result) => {
                if(err) {
                    return res.status(400).json({
                        message: 'Bad old password.'
                    });
                }

                if(result) {
                    console.log(result);

                    bcrypt.hash(newPassword, 10, async (err, hash) => {
                        if(err) {
                            return res.status(500).json({
                                err
                            });
                        }
                
                        if(hash) {
                            toUpdate.password = hash;
                            console.log(toUpdate);
                            const result = await models.Users.update(toUpdate, { where: { iduser: req.params.iduser } });
        
                            console.log(result);
                            return res.status(200).json({
                                message: 'User updated.'
                            });
                        }
                
                        if(!err && !result) {
                            return res.status(500).json({
                                message: 'Server error'
                            });
                        }
                    });
                }

                if(!err && !result) {
                    return res.status(500).json({
                        message: 'Bad old password.'
                    });
                }
            });
        } catch(error) {
            console.log(error);
            return res.status(500).json({
                error
            });
        }
    } else {
        console.log(toUpdate);

        if(Object.keys(toUpdate).length === 0) {
            return res.status(400).json({
                message: 'Nothing to change.'
            });
        }

        try {
            const result = await models.Users.update(toUpdate, { where: { iduser: req.params.iduser } });

            console.log(result);
            return res.status(200).json({
                message: 'User updated.'
            });
        } catch(error) {
            console.log(error);
            return res.status(500).json({
                error
            });
        }
    }
}

exports.DeleteUser = async (req, res) => {
    try {
        const deleteTags = await tagsController.DeleteTagsOfAUser(req.params.iduser);

        if(!deleteTags.result) {
            return res.status(500).json({
                message: deleteTags.message
            });
        }

        const deleteTasks = await tasksController.DeleteTasksOfAUser(req.params.iduser);

        if(!deleteTasks.result) {
            return res.status(500).json({
                message: deleteTasks.message
            });
        }

        const deleteProjects = await projectsController.DeleteProjectsOfAUser(req.params.iduser);

        if(!deleteProjects.result) {
            return res.status(500).json({
                message: deleteProjects.message
            });
        }

        const result = await models.Users.destroy({ where: { iduser: req.params.iduser }});

        if(result === 0) {
            return res.status(400).json({
                message: 'User ID not found.'
            });
        }

        res.status(200).json({
            message: 'User deleted.'
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}
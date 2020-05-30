const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.LoginUser = (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({
            message: 'Email and password required.'
        });
    }

    Users.findOne({ where: { email: email } })
        .then(user => {
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
                        expiresIn: "1h"
                    });

                    return res.status(200).json({
                        message: 'Auth successful.',
                        token
                    });
                }

                res.status(401).json({
                    message: 'Auth failed.'
                });
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error
            });
        });
}

exports.CreateUser = (req, res) => {
    const { name, lastname, email, password } = req.body;

    if(!name || !lastname || !email || !password) {
        return res.status(400).json({
            message: 'Name, lastname, email and password are required.'
        });;
    }

    Users.findOne({ where: { email: email } })
        .then(user => {
            if(user !== null) {
                return res.status(409).json({
                    message: 'Mail exists'
                });
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            err
                        });
                    } else {
                        Users.create({
                            name: name.toUpperCase(),
                            lastname: lastname.toUpperCase(),
                            password: hash,
                            email: email
                        })
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created.'
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                res.status(500).json({
                                    error
                                });
                            });
                    }
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

exports.UpdateUser = (req, res) => {
    const { name, lastname, password, email, oldPassword } = req.body;

    let toUpdate = {};

    if(name) toUpdate.name = name;
    if(lastname) toUpdate.lastname = lastname;
    if(email) toUpdate.email = email;

    if(password) {
        if(!oldPassword) {
            return res.status(400).json({
                message: 'Old password required.'
            });
        } else {
            Users.findByPk(req.params.iduser)
            .then(user => {
                if(user === null) {
                    return res.status(400).json({
                        message: 'Bad user ID.'
                    });
                }

                bcrypt.compare(oldPassword, user.password, (err, result) => {
                    if(err) {
                        return res.status(401).json({
                            message: 'Wrong old password.'
                        });
                    }
    
                    if(result) {
                        console.log(result);
                    }
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

    bcrypt.hash(password, 10, (err, hash) => {
        if(err) {
            return status(500).json({
                err
            });
        }

        if(hash) {
            console.log(hash);
            toUpdate.password = hash;
        }
    });

    console.log(toUpdate);

    if(Object.keys(toUpdate).length === 0) {
        return res.status(400).json({
            message: 'Nothing to change.'
        });
    } else {
        Users.update(toUpdate, { where: { iduser: req.params.iduser } })
            .then(result => {
                console.log(result);
                return res.status(200).json({
                    message: 'User updated.'
                });
            })
            .catch(error => {
                return res.status(500).json({
                    error
                });
            });
    }
}

exports.DeleteUser = (req, res) => {
    console.log(req.params);
    Users.destroy({ where: { iduser: req.params.iduser }})
        .then(result => {
            if(result === 0) {
                return res.status(400).json({
                    message: 'User ID not found.'
                });
            }

            res.status(200).json({
                message: 'User deleted'
            });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                error
            });
        })
}
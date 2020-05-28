const Users = require('../models/Users');
const bcrypt = require('bcrypt');

exports.LoginUser = async (req, res) => {
    Users.findOne({ where: { email: req.body.email } })
        .then(user => {
            if(user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed.'
                })
            }

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message: 'Auth failed.'
                    });
                }

                if(result) {
                    res.status(200).json({
                        message: 'Auth successful.'
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
    console.log(req.body);
    Users.findOne({ where: { email: req.body.email } })
        .then(user => {
            if(user != null) {
                return res.status(409).json({
                    message: 'Mail exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            err
                        });
                    } else {
                        Users.create({
                            name: (req.body.name).toUpperCase(),
                            lastname: (req.body.lastname).toUpperCase(),
                            password: hash,
                            email: req.body.email
                        })
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created'
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

exports.DeleteUser = (req, res) => {
    console.log(req.params);
    Users.destroy({ where: { iduser: req.params.iduser }})
        .then(result => {
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
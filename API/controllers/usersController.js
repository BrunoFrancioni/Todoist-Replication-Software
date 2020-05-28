const Users = require('../models/Users');
const bcrypt = require('bcrypt');

exports.LoginUser = async (req, res) => {
    
}

exports.CreateUser = async (req, res) => {
    Users.find({where: {email: req.body.email}})
        .then(user => {
            if(user.length >= 1) {
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

exports.DeleteUser = async (req, res) => {
    Users.destroy({ where: { idUser: req.params.idUser }})
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
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.LoginUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({
            message: 'Email and password required.'
        });
    }

    try {
        const user = await Users.findOne({ where: { email: email } });

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
        const user = await Users.findOne({ where: { email: email } });

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
                const result = await Users.create({
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

    const checkUserAndPassword = CheckUserAndPassword(req.params.iduser, oldPassword);

    if(!checkUserAndPassword.result) {
        return res.status(checkUserAndPassword.status).json({
            message: checkUserAndPassword.message
        });
    }

    if(newPassword) {
        const hashPassword = await GeneratePasswordHashed(newPassword);
        
        if(!hashPassword.result) {
            return res.status(hashPassword.status).json({
                message: hashPassword.message
            });
        } else {
            toUpdate.password = hashPassword.hash;
        }
    }

    console.log(toUpdate);

    if(Object.keys(toUpdate).length === 0) {
        return res.status(400).json({
            message: 'Nothing to change.'
        });
    }

    try {
        const result = await Users.update(toUpdate, { where: { iduser: req.params.iduser } });

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

const CheckUserAndPassword = async (iduser, oldPassword) => {
    try {
        const user = await Users.findByPk(iduser);

        if(user === null) {
            return ({
                result: false,
                status: 401,
                message: 'User ID not valid.'
            });
        }

        if(oldPassword) {
            bcrypt.compare(oldPassword, user.password, (err, result) => {
                if(err) {
                    return ({
                        result: false,
                        status: 401,
                        message: 'Bad old password.'
                    });
                }
    
                if(result) {
                    return ({
                        result: true
                    });
                }
    
                return ({
                    result: false,
                    status: 401,
                    message: 'Bad old password.'
                });
            });
        }
    } catch(error) {
        console.log(error);
        return ({
            result: false,
            status: 500,
            message: error
        });
    }
}

const GeneratePasswordHashed = async (newPassword) => {
    bcrypt.hash(newPassword, 10, (err, hash) => {
        if(err) {
            return ({
                result: false,
                status:500,
                message: err
            });
        }

        if(hash) {
            console.log(hash);
            return ({
                result: true,
                hash
            });
        }

        return ({
            result: false,
            status: 500,
            message: 'error'
        });
    });
}

exports.DeleteUser = async (req, res) => {
    try {
        const result = await Users.destroy({ where: { iduser: req.params.iduser }});

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
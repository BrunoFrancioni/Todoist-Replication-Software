const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

module.exports = () => {
    router.post('/login', usersController.LoginUser);

    router.post('/register', usersController.CreateUser);

    router.delete('/:idUser', usersController.DeleteUser);

    return router;
}
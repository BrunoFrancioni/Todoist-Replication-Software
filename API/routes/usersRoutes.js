const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

module.exports = () => {
    router.post('/login', usersController.LoginUser);

    router.post('/signup', usersController.CreateUser);

    router.delete('/:iduser', usersController.DeleteUser);

    return router;
}
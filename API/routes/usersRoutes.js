const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const checkAuto = require('../middleware/check-auth');

module.exports = () => {
    router.post('/login', usersController.LoginUser);

    router.post('/signup', usersController.CreateUser);

    router.put('/:iduser', checkAuto, usersController.UpdateUser);

    router.delete('/:iduser', checkAuto, usersController.DeleteUser);

    return router;
}
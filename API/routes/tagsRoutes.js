const express = require('express');
const router = express.Router();

const tagsController = require('../controllers/tagsController');

module.exports = () => {
    router.post('/', tagsController.CreateTag);

    router.get('/:iduser', tagsController.GetTagsOfAUser);

    router.delete('/:idtag', tagsController.DeleteTag);

    return router;
}

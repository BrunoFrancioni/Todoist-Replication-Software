const express = require('express');
const router = express.Router();

const tagsController = require('../controllers/tagsController');
const checkAuto = require('../middleware/check-auth');

module.exports = () => {
    router.post('/', checkAuto, tagsController.CreateTag);

    router.get('/:iduser', checkAuto, tagsController.GetTagsOfAUser);

    router.put('/:idtag', checkAuto, tagsController.UpdateTag);

    router.delete('/:idtag', checkAuto, tagsController.DeleteTag);

    return router;
}

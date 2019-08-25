const router = require('express').Router();
const controller = require('./card.controller');

router.post('', controller.createCard);
router.get('', controller.getMyCards);
router.get('/size', controller.getSizeByCardId);
module.exports = router;


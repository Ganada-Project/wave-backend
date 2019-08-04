const router = require('express').Router();
const controller = require('./card.controller');

router.post('', controller.createCard);
module.exports = router;


const router = require('express').Router();
const controller = require('./item.controller');

router.post('', controller.createItem);

module.exports = router;


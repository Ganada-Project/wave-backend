const router = require('express').Router();
const controller = require('./item.controller');

router.post('', controller.createItem);
router.get('/all',controller.getAllItem);

module.exports = router;


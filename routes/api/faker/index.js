const router = require('express').Router();
const controller = require('./faker.controller');

router.post('/item/:iter', controller.generateItem);
module.exports = router;


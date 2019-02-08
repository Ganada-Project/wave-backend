const router = require('express').Router();
const controller = require('./faker.controller');

router.post('/item/:iter', controller.generateItem);
router.post('/brand/:iter', controller.generateBrand);
module.exports = router;


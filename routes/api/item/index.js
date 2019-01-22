const router = require('express').Router();
const controller = require('./item.controller');

router.post('', controller.createItem);
router.post('/size', controller.createSize);
router.get('', controller.getItemsByBrandId);
module.exports = router;


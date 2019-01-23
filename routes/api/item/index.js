const router = require('express').Router();
const controller = require('./item.controller');

router.post('', controller.createItem);
router.post('/size', controller.createSize);
router.get('', controller.getItemsByBrandId);
router.get('/one', controller.getItemById);

// router.post('/onsale/:item_id', controller.makeOnSale);
// router.post('/offsale/:item_id', controller.makeOffSale);

module.exports = router;


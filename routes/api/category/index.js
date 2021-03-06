const router = require('express').Router();
const controller = require('./category.controller');

router.get('/category1', controller.getCategory1);
router.get('/category2/:parent_id', controller.getCategory2);
router.get('/category3/:parent_id', controller.getCategory3);
module.exports = router;


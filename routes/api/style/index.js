const router = require('express').Router();
const controller = require('./style.controller');

router.get('', controller.getAllStyles);
router.get('/user/:user_id', controller.getStyleByUserId);
router.get('/:style_id', controller.getStyleById);
router.post('/recommend', controller.recommendStyleByUserStyle);



module.exports = router;

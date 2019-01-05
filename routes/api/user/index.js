const router = require('express').Router();
const controller = require('./user.controller');

router.get('/:user_id', controller.getUserById);
router.patch('/user/body', controller.updateBodyByUserId);
router.get('', controller.getMe);
module.exports = router;

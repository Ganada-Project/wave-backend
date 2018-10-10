const router = require('express').Router();

const style = require('./style');
// const user = require('./user');
const authMiddleware = require('../../middlewares/auth');

// router.use('/auth', auth);

// router.use('/user', authMiddleware);
// router.use('/user', user);

//router.use('/style', authMiddleware);
router.use('/style', style);

module.exports = router;

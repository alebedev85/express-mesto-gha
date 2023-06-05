const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validateUserBody } = require('../middlewares/validate');

const userRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser } = require('../controllers/users');

router.post('/signup', validateUserBody, createUser);

router.post('/signin', validateUserBody, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardsRouter);

module.exports = router;

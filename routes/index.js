const router = require('express').Router();
const auth = require('../middlewares/auth');

const userRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser } = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardsRouter);

router.use((req, res) => {
  res.status(404).send({
    message: 'Ohh you are lost, read the API documentation to find your way back home :)',
  });
});

module.exports = router;

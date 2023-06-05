const router = require('express').Router();
const { validateEditUserInfo, validateEditUserAvatar } = require('../middlewares/validate');
const userController = require('../controllers/users');

router.get('/', userController.getUsers);

router.get('/me', userController.getMyUser);

router.get('/:userId', userController.getUserById);

router.patch('/me', validateEditUserInfo, userController.edithUser);

router.patch('/me/avatar', validateEditUserAvatar, userController.editAvatarhUser);

module.exports = router;

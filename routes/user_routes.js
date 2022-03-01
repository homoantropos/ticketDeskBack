const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/user_controller');
const upload = require('../middleware/upload')

router.post('/register', upload.single('image'), controller.registerUser);
router.get('/confirm/:confirmationCode', controller.confirmUser);
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.updateUser);
router.post('/login', controller.login);
router.get('/role', passport.authenticate('jwt', {session: false}, controller.getRole));
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllUsers);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getOneUserById);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteUser);

module.exports = router

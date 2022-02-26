const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/user_controller');
const upload = require('../middleware/upload')

router.post('/register',   controller.registerUser);
router.patch('/:id', upload.single('image'), passport.authenticate('jwt', {session: false}), controller.updateUser);
router.post('/login', controller.login);
router.get('/role', passport.authenticate('jwt', {session: false}, controller.getRole));
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllUsers);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getOneUserById);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteUser);

module.exports = router

const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/theatre_controller');

router.post('/create', passport.authenticate('jwt', {session: false}), controller.createTheatre);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.updateTheatre);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteTheatre);
router.get('/', controller.getTheatres);
router.get('/:id', controller.getTheatreById);


module.exports = router

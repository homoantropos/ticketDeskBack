const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/auditorium_section_controller');

router.post('/create', passport.authenticate('jwt', {session: false}), controller.createSection);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.updateSection);
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllSections);
router.get('/sectionNames', passport.authenticate('jwt', {session: false}), controller.getSectionNames);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getOneSection);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteSection);

module.exports = router

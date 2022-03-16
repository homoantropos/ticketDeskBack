const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/venue_controller');


router.post('/create', passport.authenticate('jwt', {session: false}), controller.createVenue);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.updateVenue);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteVenue);
router.get('/:id', controller.getVenueById);
router.get('/', controller.getAllVenues);


module.exports = router

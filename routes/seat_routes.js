const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require("../controllers/seat_controller")

router.post('/create', passport.authenticate('jwt', {session: false}), controller.createSeat);
router.patch('/', passport.authenticate('jwt', {session: false}), controller.updateSeat);
router.delete('/', passport.authenticate('jwt', {session: false}), controller.deleteSeat);
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllSeats);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getSeatById);

module.exports = router

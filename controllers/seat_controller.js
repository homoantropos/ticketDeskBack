const Seat = require('../models/Seat');
const Venue = require('../models/Venue');
const auth = require('../database/auth');

class Seat_controller {

    async createSeat(req, res) {
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {
                const venue = await Venue.findOne({
                    where: {
                        name: req.body.venue.name,
                        address: req.body.venue.address
                    }
                });
                if (venue) {
                    const promises = req.body.seats.map(
                        async seat => {
                            let createdSeat = await Seat.findOne({
                                where: {
                                    venueHall: seat.venueHall ? seat.venueHall : '',
                                    hallSection: seat.hallSection ? seat.hallSection : '',
                                    row: seat.row ? seat.row : null,
                                    seatNumber: seat.seatNumber ? seat.seatNumber : null,
                                }
                            });
                            if (!createdSeat) {
                                createdSeat = await venue.createSeat({
                                        venueHall: seat.venueHall ? seat.venueHall : '',
                                        hallSection: seat.hallSection ? seat.hallSection : '',
                                        row: seat.row ? seat.row : null,
                                        seatNumber: seat.seatNumber ? seat.seatNumber : null,
                                        typeOfSeat: seat.typeOfSeat ? seat.typeOfSeat : 'regular'
                                    }
                                );
                            }
                            return createdSeat;
                        }
                    );
                    const seats = await Promise.all(promises);
                    res.status(200).json({
                        seats,
                        message: `???????? ?????????????? ??????????????????!`
                    });
                } else {
                    res.status(401).json({
                        message: `${req.body.venue.name} ?? ?????????????? ${req.body.venue.address} ?? ???????? ?????????? ???? ????????????????`
                    })
                }
            } catch (error) {
                res.status(500).json({
                    message: error.message ? error.message : error
                })
            }
        } else {
            res.status(401).json({
                message: '???????????????? ?????????????????? ?????????? ??????????????'
            })
        }
    }

    async updateSeat(req, res) {
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {
                const promises = req.body.seats.map(
                    async seat => {
                        const candidate = await Seat.findOne({
                            where: {id: seat.id}
                        });
                        if (candidate) {
                            await Seat.update({
                                venueHall: seat.venueHall ? seat.venueHall : '',
                                hallSection: seat.hallSection ? seat.hallSection : '',
                                row: seat.row ? seat.row : null,
                                seatNumber: seat.seatNumber ? seat.seatNumber : null,
                                typeOfSeat: seat.typeOfSeat ? seat.typeOfSeat : 'regular'
                            }, {
                                where: {
                                    id: seat.id
                                }
                            });
                            return await Seat.findOne({
                                where: {id: candidate.id}
                            });
                        } else {
                            res.status(401).json({
                                message: '?????????? ?? ???????????? ?????????????? ???? ????????????????'
                            })
                        }
                    }
                );
                const newSeats = await Promise.all(promises);
                res.status(200).json({
                    newSeats,
                    message: '?????????? ?????????????? ??????????????????!'
                });
            } catch (error) {
                res.status(500).json({
                    message: error.message ? error.message : error
                })
            }
        } else {
            res.status(401).json({
                message: '???????????????? ?????????????????? ?????????? ??????????????'
            })
        }
    }

    async deleteSeat(req, res) {
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {
                const promises = req.body.ids.map(
                    async id => {
                        const candidate = await Seat.findOne({
                            where: {id}
                        });
                        if (candidate) {
                            await Seat.destroy({
                                where: {id}
                            });
                            return {
                                id,
                                message: '???????? ?????????????? ????????????????'
                            }
                        } else {
                            return {
                                id,
                                message: '?????????? ?????????????? ?????????????????????? ???????? ???? ????????????????'
                            }
                        }
                    }
                );
                const results = await Promise.all(promises);
                res.status(200).json(
                    results)
            } catch (error) {
                res.status(500).json({
                    message: error.message ? error.message : error
                })
            }
        } else {
            res.status(401).json({
                message: '???????????????? ?????????????????? ?????????? ??????????????'
            })
        }
    }

    async getSeatById(req, res) {
        try {
            const venue = await Venue.findOne({
                where: {id: req.query.venueId}
            });
            if (venue) {
                const seat = await Seat.findOne({
                    where: {
                        id: req.params.id
                    }
                })
                res.status(200).json(seat);
            } else {
                res.status(401).json({
                    message: `?????????? ???????????????????? ?? id: ${req.query.venueId} ?? ???????? ?????????? ???? ????????????????`
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllSeats(req, res) {
        try {
            const venue = await Venue.scope('venue').findOne({
                where: {id: req.query.venueId}
            })
            if (venue) {
                let seats = await Seat.findAll();
                // if (req.query.venueHall) {
                //     seats = seats.filter(seat => seat.venueHall === req.query.venueHall)
                // }
                // if (req.query.hallSection) {
                //     seats = seats.filter(seat => seat.hallSection === req.query.hallSection)
                // }
                // if (req.query.row) {
                //     const row = +req.query.row;
                //     seats = seats.filter(seat => seat.row === row)
                // }
                // if (req.query.seatNumber) {
                //     const seatNumber = +req.query.seatNumber;
                //     seats = seats.filter(seat => seat.seatNumber === seatNumber)
                // }
                // if (req.query.typeOfSeat) {
                //     seats = seats.filter(seat => seat.typeOfSeat === req.query.typeOfSeat)
                // }
                res.status(200).json(seats);
            } else {
                res.status(401).json({
                    message: `?????????? ???????????????????? ?? id: ${req.query.venueId} ?? ???????? ?????????? ???? ????????????????`
                })
            }

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

}

module.exports = new Seat_controller()

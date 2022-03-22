const auth = require("../database/auth");
const Venue = require('../models/Venue');
const Seat = require('../models/Seat')

class Venue_controller {

    async createVenue(req, res) {
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {
                const venue = await Venue.findOrCreate({
                    where: {
                        name: req.body.name,
                        country: req.body.country,
                        town: req.body.town,
                        street: req.body.street,
                        building: req.body.building,
                        phones: req.body.phones ? req.body.phones : [],
                        email: req.body.email ? req.body.email : '',
                        webSite: req.body.webSite ? req.body.webSite : ''
                    }
                });
                if (req.body.seats) {
                    const promises = req.body.seats.map(
                        async seat => {
                            const createdSeat = await Seat.findOrCreate({
                                where: {
                                    venueHall: seat.venueHall ? seat.venueHall : '',
                                    hallSection: seat.hallSection ? seat.hallSection : '',
                                    row: seat.row ? seat.row : null,
                                    seatNumber: seat.seatNumber ? seat.seatNumber : null,
                                    typeOfSeat: seat.typeOfSeat ? seat.typeOfSeat : 'regular'
                                }
                            })
                            return await venue[0].addSeat(createdSeat[0]);
                        }
                    );
                    const results = await Promise.all(promises);
                    venue[0].seats = results.slice();
                }
                res.status(200).json(
                    venue[0]
                )
            } catch (error) {
                res.status(500).json({
                    message: error.message ? error.message : error
                })
            }
        } else {
            res.status(401).json({
                message: 'відсутні необіхдні права доступу'
            })
        }
    }

    async updateVenue(req, res) {
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {
                await Venue.update({
                    name: req.body.name,
                    country: req.body.country,
                    town: req.body.town,
                    street: req.body.street,
                    building: req.body.building,
                    phones: req.body.phones ? req.body.phones : [],
                    email: req.body.email ? req.body.email : '',
                    webSite: req.body.webSite ? req.body.webSite : ''
                }, {
                    where: {
                        id: req.params.id
                    }
                });
                const venue = await Venue.scope('venue').findOne({
                    where: {
                        id: req.params.id
                    }
                });
                if (req.body.seats) {
                    await Seat.destroy({
                        where: {venueId: venue.id}
                    });
                    const promises = req.body.seats.map(
                        async seat => {
                            const createdSeat = await Seat.findOrCreate({
                                    where: {
                                        venueHall: seat.venueHall ? seat.venueHall : '',
                                        hallSection: seat.hallSection ? seat.hallSection : '',
                                        row: seat.row ? seat.row : null,
                                        seatNumber: seat.seatNumber ? seat.seatNumber : null,
                                        typeOfSeat: seat.typeOfSeat ? seat.typeOfSeat : 'regular'
                                    }
                                }
                            )
                            return await venue.addSeat(createdSeat[0]);
                        }
                    );
                    const results = await Promise.all(promises);
                    venue.seats = results.slice();
                }
                res.status(201).json({
                    venue,
                    message: `Ваші зміни успішно збередено!`
                })
            } catch (error) {
                res.status(500).json({
                    message: error.message ? error.message : error
                })
            }
        } else {
            res.status(401).json({
                message: 'відсутні необіхдні права доступу'
            })
        }
    }

    async deleteVenue(req, res) {
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {
                await Venue.destroy({
                    where: {
                        id: req.params.id
                    }
                });
                res.status(201).json({
                    venueId: req.params.id,
                    message: 'Дані успішно видалено'
                });
            } catch (error) {
                res.status(500).json({
                    message: error.message ? error.message : error
                })
            }
        } else {
            res.status(401).json({
                message: 'відсутні необіхдні права доступу'
            })
        }
    }

    async getVenueById(req, res) {
        try {
            const venue = await Venue.scope('venue').findOne({
                where: {
                    id: req.params.id
                }
            })
            if (venue) {
                res.status(201).json(venue);
            } else {
                res.status(401).json({
                    message: `Місця проведення з id ${req.params.id} в базі даних не знайдено`
                })
            }

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllVenues(req, res) {
        try {
            const venues = await Venue.scope('venue').findAll();
            res.status(201).json(venues);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Venue_controller()

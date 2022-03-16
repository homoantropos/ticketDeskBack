const auth = require("../database/auth");
const Venue = require('../models/Venue');

class Venue_controller {

    async createVenue(req, res) {
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {
                const venue = await Venue.findOrCreate({
                    where: {
                        name: req.body.name,
                        address: req.body.address,
                        phones: req.body.phones ? req.body.phones : [],
                        email: req.body.email ? req.body.email : '',
                        webSite: req.body.webSite ? req.body.webSite : ''
                    }
                })
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
                    address: req.body.address,
                    phones: req.body.phones ? req.body.phones : [],
                    email: req.body.email ? req.body.email : '',
                    webSite: req.body.webSite ? req.body.webSite : ''
                }, {
                    where: {
                        name: req.body.name,
                        address: req.body.address
                    }
                });
                const venue = await Venue.findOne({
                    where: {
                        name: req.body.name,
                        address: req.body.address
                    }
                })
                if (req.body.seats) {
                    const promises = req.body.seats.map (
                        async seat => {
                            await venue.addSeat([seat.id, venue.id]);
                        }
                    );
                    await Promise.all(promises);
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
            if(venue) {
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

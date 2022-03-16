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

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllVenues(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Venue_controller()

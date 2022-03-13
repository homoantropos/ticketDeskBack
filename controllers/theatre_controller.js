const Theatre = require('../models/Theatre');
const auth = require('../database/auth');
const Auditorium_section = require("../models/AuditoriumSection");

class Theatre_controller {

    async createTheatre(req, res) {
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {
                const theatre = await Theatre.findOrCreate({
                        where: {
                            name: req.body.name,
                            country: req.body.country,
                            town: req.body.town,
                            address: req.body.address
                        }
                    }
                );
                const promises = req.body.seats.map(
                    async seat => {
                        const section = await Auditorium_section.findOne({
                            where: {
                                sectionName: seat.sectionName
                            }
                        });
                        return await theatre[0].createSeat({
                                row: seat.row,
                                seatNumber: seat.seatNumber,
                                auditoriumSectionId: section.id
                        });
                    }
                );
                const seats = await Promise.all(promises);
                console.log(seats);
                res.status(200).json(seats);
            } catch (error) {
                res.status(401).json({
                    message: error.message ? error.message : error
                })
            }
        } else {
            res.status(401).json({
                message: 'відсутні необхідні права доступу'
            })
        }
    }

    async updateTheatre(req, res) {
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {

            } catch (error) {
                res.status(401).json({
                    message: error.message ? error.message : error
                })
            }
        } else {
            res.status(401).json({
                message: 'відсутні необхідні права доступу'
            })
        }
    }

    async deleteTheatre(req, res) {
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {

            } catch (error) {
                res.status(401).json({
                    message: error.message ? error.message : error
                })
            }
        } else {
            res.status(401).json({
                message: 'відсутні необхідні права доступу'
            })
        }
    }

    async getTheatres(req, res) {
        try {

        } catch (error) {
            res.status(401).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getTheatreById(req, res) {
        try {

        } catch (error) {
            res.status(401).json({
                message: error.message ? error.message : error
            })
        }
    }
}


module.exports = new Theatre_controller();

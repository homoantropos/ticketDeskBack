const Seat = require('../models/Seat');
const Auditorium_section = require('../models/AuditoriumSection')
const auth = require('../database/auth');

class Seat_controller {

    async createSeat(req, res) {
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {
                const promises = req.body.seats.map(
                    async seat => {
                        const section = await Auditorium_section.findOne({
                            where: {
                                sectionName: seat.sectionName
                            }
                        });
                        const createdSeat = await Seat.scope('place').findOrCreate({
                            where: {
                                row: seat.row,
                                seatNumber: seat.seatNumber,
                                auditoriumSectionId: section.id
                            }
                        });
                        return createdSeat[0];
                    }
                );
                const seats = await Promise.all(promises);
                res.status(200).json({
                    seats,
                    message: `Дані успішно збережено!`
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

    async updateSeat(req, res) {
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {
                const promises = req.body.seats.map(
                    async seat => {
                        const candidate = await Seat.scope('place').findOne({
                            where: {id: seat.id}
                        });
                        if (candidate) {
                            await Seat.update({
                                row: seat.row,
                                seatNumber: seat.seatNumber
                            }, {
                                where: {
                                    id: seat.id
                                }
                            });
                            return await Seat.scope('place').findOne({
                                where: {id: candidate.id}
                            });
                        } else {
                            res.status(401).json({
                                message: 'Такої частини глядацького залу не знайдено'
                            })
                        }
                    }
                );
                const newSeats = await Promise.all(promises);
                res.status(200).json({
                    newSeats,
                    message: 'Зміни успішно збережені!'
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
                                message: 'Дані успішно видалено'
                            }
                        } else {
                            return {
                                id,
                                message: 'Такої частини глядацького залу не знайдено'
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
                message: 'відсутні необіхдні права доступу'
            })
        }
    }

    async getSeatById(req, res) {
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {
                const seat = await Seat.scope('place').findOne({
                    where: {
                        id: req.params.id
                    }
                })
                res.status(200).json(seat);
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

    async getAllSeats(req, res) {
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {
                const seats = await Seat.scope('place').findAll();
                res.status(200).json(seats);
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

}

module.exports = new Seat_controller()

const AuditoriumSection = require('../models/AuditoriumSection');

class AuditoriumSection_controller {

    async createSection(req, res) {
        if(req.user.role === 'superAdmin') {
            try {
                const auditoriumSection = await AuditoriumSection.findOrCreate({
                    where: {
                        sectionName: req.body.sectionName
                    }
                });
                res.status(200).json(auditoriumSection[0]);
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

    async updateSection(req, res) {
        if(req.user.role === 'superAdmin') {
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

    async getAllSections(req, res) {
        if(req.user.role === 'superAdmin') {
            try {
                const sections = await AuditoriumSection.findAll();
                res.status(201).json(sections);
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

    async getOneSection(req, res) {
        if(req.user.role === 'superAdmin') {
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

    async deleteSection(req, res) {
        if(req.user.role === 'superAdmin') {
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

}

module.exports = new AuditoriumSection_controller()

const AuditoriumSection = require('../models/AuditoriumSection');

class AuditoriumSection_controller {

    async createSection(req, res) {
        if(req.user.role === 'superAdmin') {
            try {
                const auditoriumSection = await AuditoriumSection.findOrCreate({
                    sectionName: req.body.sectionName
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

const AuditoriumSection = require('../models/AuditoriumSection');
const auth = require('../database/auth')

class AuditoriumSection_controller {

    async createSection(req, res) {
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {
                const auditoriumSection = await AuditoriumSection.findOrCreate({
                    where: {
                        sectionName: req.body.sectionName
                    }
                });
                res.status(200).json({
                    section: auditoriumSection[0],
                    message: 'Нова секція глядацького залу успішно додана!'
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

    async updateSection(req, res) {
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {
                await AuditoriumSection.update({
                        sectionName: req.body.sectionName
                    }, {
                        where: {id: req.params.id}
                    }
                );
                const section = await AuditoriumSection.findOne({
                    where: {id: req.params.id}
                });
                res.status(200).json({
                    section,
                    message: 'Зміни успішно збережені.'
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

    async getAllSections(req, res) {
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
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
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {
                const section = await AuditoriumSection.findOne({
                    where: {id: req.params.id}
                })
                res.status(200).json(section);
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
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {
                await AuditoriumSection.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                res.status(200).json({
                    message: 'Дані успішно видалено!'
                })
            } catch (error) {
                res.status(500).json({
                    message: error.message ? error.message : error
                })
            }
        } else {
            res.status(401).json({
                message: 'відсутні необхідні права доступу'
            })
        }
    }

    async getSectionNames(req, res) {
        const accessAllowed = await auth.allowAccess(req, 'superAdmin');
        if (accessAllowed) {
            try {
                const sections = await AuditoriumSection.findAll();
                let sectionNames = []
                Object.keys(sections).map(
                    key => sectionNames.push(sections[key].sectionName)
                );
                res.status(200).json(sectionNames);
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

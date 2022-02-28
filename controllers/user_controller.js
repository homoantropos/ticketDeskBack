const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const ac = require('../middleware/ac');
const User = require('../models/User');
const userConfirmationCodeGenerator = require('../utils/userConfirmationCodeGenerator')

class User_controller {

    async registerUser(req, res) {
        try {
            const salt = await bcrypt.genSalt(10);
            let password = await bcrypt.hash(req.body.password, salt);
            const role = await ac.getRole(req.body.role);
            const confirmationCode = await userConfirmationCodeGenerator;
            if (typeof role === 'string') {
                await User.create({
                    email: req.body.email,
                    password,
                    birthday: new Date(req.body.birthday),
                    role,
                    surname: req.body.surname,
                    name: req.body.name,
                    phoneNumber: req.body.phoneNumber,
                    profilePictureSrc: req.file ? req.file.path : '',
                    status: 'pending',
                    confirmationCode
                });
                const user = await User.scope('userResponse').findOne({
                    where: {email: req.body.email}
                });
                console.log(user);
                res.status(201).json(user);
            } else {
                res.status(401).json({
                    message: role.message ? role.message : role
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async login(req, res) {
        try {
            const candidate = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!candidate) {
                res.status(404).json({
                    message: 'EMAIL_NOT_FOUND'
                })
            }
            if (candidate.status !== 'active') {
                res.status(401).json({
                    message: 'Ваш аккаунт не активовано. Перейдіть за посиланням, надісланим на пошту,' +
                        'указану Вами при реєстрації для активації аккаунту.'
                })
            } else {
                const passwordCompare = await bcrypt.compare(req.body.password, candidate.password);
                if (passwordCompare) {
                    const token = jwt.sign({
                        email: candidate.email,
                        role: candidate.role,
                        userId: candidate.id
                    }, keys.jwt, {expiresIn: 60 * 60});
                    res.status(200).json({
                        token: `Bearer ${token}`
                    });
                } else {
                    res.status(401).json({
                        message: 'INVALID_PASSWORD'
                    })
                }
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateUser(req, res) {
        try {
            const candidate = await User.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!candidate) {
                res.status(400).json({
                    message: 'Користувача з таким ID не знайдено'
                })
            } else {
                const passwordsCompare = await bcrypt.compare(req.body.actualPassword, candidate.password);
                if (passwordsCompare || req.user.role === 'superAdmin') {
                    console.log()
                    const salt = await bcrypt.genSalt(10);
                    let password = await bcrypt.hash(req.body.actualPassword, salt);
                    if (req.body.password) {
                        password = await bcrypt.hash(req.body.password, salt);
                    }
                    let role = req.body.role;
                    if (role !== req.user.role)
                        role = await ac.getRole(role);
                    if (typeof role === 'string') {
                        await User.update({
                                email: req.body.email,
                                password,
                                birthday: new Date(req.body.birthday),
                                role,
                                surname: req.body.surname,
                                name: req.body.name,
                                phoneNumber: req.body.phoneNumber,
                                profilePictureSrc: req.file ? req.file.path : req.body.profilePictureSrc
                            },
                            {where: {email: req.user.email}});
                        const user = await User.scope('userResponse').findOne({
                            where: {email: req.body.email}
                        });
                        res.status(200).json({
                            user
                        });
                    } else {
                        res.status(401).json({
                            message: role.message ? role.message : role
                        });
                    }
                } else {
                    res.status(401).json({
                        message: 'INVALID_PASSWORD'
                    })
                }
            }
        } catch (error) {
            res.status(401).json({
                message: error.message ? error.message : error
            });
        }
    }

    async getAllUsers(req, res) {
        if (req.user.role === 'superAdmin') {
            try {
                const users = await User.findAll();
                res.status(201).json(users);
            } catch (error) {
                res.status(500).json({
                    message: error.message ? error.message : error
                })
            }
        } else {
            res.status(401).json({
                message: 'Ви не маєте права реєструвати учасників, зверніться до адміністратора сайту.'
            })
        }
    }

    async getOneUserById(req, res) {
        try {
            const candidate = await User.scope('userResponse').findOne({
                where: {
                    id: req.params.id
                }
            });
            if (candidate || req.user.role === 'superAdmin') {
                const emailCompare = req.user.email === candidate.email;
                if (emailCompare || req.user.role === 'superAdmin') {
                    res.status(201).json(candidate);
                } else {
                    res.status(401).json({
                        message: 'Ви не маєте права доступу до профілю цього користувача'
                    })
                }
            } else {
                res.status(401).json({
                    message: 'INVALID_PASSWORD'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteUser(req, res) {
        try {
            const candidate = await User.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (candidate.email === req.user.email || req.user.role === 'superAdmin') {
                await User.destroy({
                    where: {
                        id: req.params.id
                    }
                });
                res.status(201).json({
                    message: `Користувача успішно видалено`
                });
            } else {
                res.status(401).json({
                    message: 'Ви не маєте права реєструвати учасників, зверніться до адміністратора сайту.'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getRole(req, res) {
        try {
            const candidate = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!candidate) {
                res.status(404).json({
                    message: 'EMAIL_NOT_FOUND'
                })
            } else {
                const passwordCompare = await bcrypt.compare(req.body.password, candidate.password);
                if (passwordCompare) {
                    const role = candidate.role;
                    res.status(200).json(role);
                } else {
                    res.status(401).json({
                        message: 'INVALID_PASSWORD'
                    })
                }
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new User_controller()




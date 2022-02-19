const Role = require('../models/Role');

module.exports.getRole =
    async function (code) {
        try {
            const role = await Role.findOne({
                where: {
                    code
                }
            })
            return role.role;
        } catch (error) {
            if (error.error) {
                error.message = 'INVALID_CODE';
            } else {

                error.message = 'INVALID_CODE';
            }
            return error;
        }

    }

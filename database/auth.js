const User = require('../models/User');

module.exports.allowAccess = async (req, role) => {
    const candidate = await User.findOne({
        where: {email: req.user.email}
    })
    let allowAccess;
    if (candidate) {
        allowAccess = (
            candidate.id === req.user.id &&
            candidate.role === req.user.role &&
            candidate.role === role
        );
    }
    return allowAccess
}

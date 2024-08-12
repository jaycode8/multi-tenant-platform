const { usersModel } = require('../models/users.model');
const verifySubDomain = async (req, res, next) => {
    try {
        const found_sub_domain = await usersModel.findOne({ where: { subdomain: req.get("host") }, attributes:{exclude:['password']} });
        if (found_sub_domain) {
            req.agent = found_sub_domain;
            return next();
        } else {
            return res.status(404).json({status: 404, message: "invalid subdomain"});
        }
    } catch (error) {
        return res.status(404).json({ status: 404, message: error.message });
    }
};

module.exports = verifySubDomain;

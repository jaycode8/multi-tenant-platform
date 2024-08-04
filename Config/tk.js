const jwt_secrete_key = process.env.SEC_KEY;
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(" ")[1];
        if (accessToken) {
            const verified = jwt.verify(accessToken, jwt_secrete_key);
            if (verified) {
                req.authenticated = true;
                req.id = verified;
                return next();
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ success: "false", message: "login first" });
    }
};

module.exports = verifyToken;

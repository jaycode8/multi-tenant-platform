 const verifyToken = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1]
        if (accessToken) {
            const verified = jwt.verify(accessToken, jwt_secrete_key);
            if (verified) {
                req.authenticated = true;
                req.id = verified;
                return next();
            }
        }
    } catch (error) {
        res.json({ success: "false", message: "login first" });
    }
 }
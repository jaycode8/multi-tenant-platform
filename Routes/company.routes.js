const router = require("express").Router();
const verifyToken = require("../Config/tk");
const verifySubDomain = require("../Config/subdomain");
const { main, dashboard } = require("../Controlers/company.controlers");

router.use(verifySubDomain);

router.get('/', main);
router.route("/dashboard")
    .get(verifyToken, dashboard)
    .post(verifyToken, dashboard);

module.exports = router;

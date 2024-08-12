const router = require("express").Router();
const { home, signin, signup, dashboard } = require("../Controlers/main.controlers");
const verifyToken = require("../Config/tk");

router.get("/", home);
router.post("/signup", signup);
router.post("/signin", signin);
router.route("/dashboard")
    .get(dashboard);

module.exports = router;
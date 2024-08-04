const router = require("express").Router();
const { home, signin, signup, dashboard, company } = require("../Controlers/main.controlers");
const verifyToken = require("../Config/tk");

router.get("/", home);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/dashboard", verifyToken, dashboard);
router.get('/company', verifyToken, company);

module.exports = router;
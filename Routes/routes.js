const router = require("express").Router();
const { home, signin, signup } = require("../Controlers/main.controlers");

router.get("/", home);
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
const router = require("express").Router();
const { home, signin, signup, dashboard, products } = require("../Controlers/main.controlers");
const verifyToken = require("../Config/tk");
const { productsB } = require("../Controlers/company.controlers");

router.get("/", home);
router.post("/signup", signup);
router.post("/signin", signin);
router.route("/dashboard")
    .get(verifyToken, dashboard)
    .post(verifyToken, dashboard);
router.get("/:subdomain", products);

module.exports = router;
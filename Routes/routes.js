const main_router = require("express").Router();
const { home, signin, signup, dashboard, company, products } = require("../Controlers/main.controlers");
const verifyToken = require("../Config/tk");
const { productsB } = require("../Controlers/company.controlers");

main_router.get("/", home);
main_router.post("/signup", signup);
main_router.post("/signin", signin);
main_router.route("/dashboard")
    .get(verifyToken, dashboard)
    .post(verifyToken, dashboard);
// main_router.get("/:subdomain", products);
main_router.route("/company")
    .get(company)
    .post(company);
main_router.get('/jay', productsB);

module.exports = main_router;
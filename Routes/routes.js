const router = require("express").Router();
const { home } = require("../Controlers/main.controlers");

router.get("/", home);

module.exports = router;
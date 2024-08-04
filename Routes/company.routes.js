const subdomain_router = require("express").Router();
const { productsB } = require("../Controlers/company.controlers");

subdomain_router.get('/jay', productsB);

module.exports = subdomain_router;

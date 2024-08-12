const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const subdomain = require('express-subdomain');
require("./Config/db");

const app = express();
const routes = require("./Routes/routes");
const subroutes = require('./Routes/company.routes');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    const host = req.get("host");
    const parts = host.split(".");
    if (parts.length > 1) {
        req.subdomain = parts[0];
        subroutes(req, res, next);
    } else {
        routes(req, res, next);
    }
});


app.listen(PORT, () => console.info(`app running through port ${PORT}`));
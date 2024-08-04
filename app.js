const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const subdomain = require('express-subdomain');
require("./Config/db");

const app = express();
const mainRoutes = require("./Routes/routes");
const subDomainRoutes = require('./Routes/company.routes');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", mainRoutes);
app.use(subdomain("apis", subDomainRoutes));

app.listen(PORT, () => console.info(`app running through port ${PORT}`));
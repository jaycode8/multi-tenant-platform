const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
require("./Config/db");

const app = express();
const routes = require("./Routes/routes");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);

app.listen(PORT, () => console.info(`app running through port ${PORT}`));
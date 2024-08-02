const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const router = require("./Routes/routes");

const app = express();
app.use('/', router);

app.listen(PORT, () => console.info(`app running through port ${PORT}`));
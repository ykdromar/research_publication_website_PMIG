const express = require("express");
const env = require("./config/env");
const mongoose = require("./config/mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = env.PORT;
const passport = require("passport");
const passportConfig = require("./config/passportConfig");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

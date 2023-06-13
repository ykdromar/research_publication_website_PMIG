const express = require("express");
const env = require("./config/env");
const mongoose = require("./config/mongoose");
const app = express();
const port = env.PORT;

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

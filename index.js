const express = require("express");
const env = require("./config/env");
const mongoose = require("./config/mongoose");
const app = express();
const port = env.PORT;
const passport = require('passport'); 
// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(passport.initialize())


// Configure Passport to use the JWT strategy
passportConfig(passport);

// Register authentication routes
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

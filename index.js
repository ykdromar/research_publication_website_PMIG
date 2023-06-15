const express = require("express");
const env = require("./config/env");
const mongoose = require("./config/mongoose");
const router = express.Router();
const usersRoute = require('./routes/api/v1/users_routes');
const authRoute = require('./routes/api/v1/auth_routes')
const app = express();
const port = env.PORT;

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

router.use('/auth',authRoute)
router.use('/users', usersRoute);


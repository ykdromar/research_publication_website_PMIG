<<<<<<< HEAD
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
=======
const express = require("express");
const env = require("./config/env");
const mongoose = require("./config/mongoose");
const router = express.Router();
const usersRoute = require('./routes/api/v1/users_routes');
const app = express();
const port = env.PORT;

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

router.use('/users', usersRoute);
>>>>>>> 9902b88df4f8a10aeb0a618525ce3064502339b9

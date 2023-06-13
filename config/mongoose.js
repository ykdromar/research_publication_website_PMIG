const mongoose = require("mongoose");
const env = require("./env");
mongoose
  .connect(`mongodb://127.0.0.1:27017/${env.DB}`)
  .then(() => console.log("Connected to mongoDB!"));

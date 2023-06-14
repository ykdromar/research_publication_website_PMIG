<<<<<<< HEAD
module.exports = {
  PORT: 8000
=======
require("dotenv").config();
module.exports = {
  PORT: 8000,
  SMTP: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_AUTH_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  DB: "PMIG-Dev",
>>>>>>> 9902b88df4f8a10aeb0a618525ce3064502339b9
  // Add more variables as needed
};

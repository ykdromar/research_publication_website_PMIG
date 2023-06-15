
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
  // Add more variables as needed
};

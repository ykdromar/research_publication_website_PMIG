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
  JWT_SECRET: process.env.JWT_SECRET,
  // Add more variables as needed
};

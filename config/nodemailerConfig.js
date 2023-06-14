const nodemailer = require("nodemailer");
const env = require("./env");
module.exports.sendOTP = async (email) => {
  const transporter = nodemailer.createTransport(env.SMTP);

  const otp = Math.floor(Math.random() * 10000 + 1);

  const mailOptions = {
    from: '"research_publication_website_PMIG" <pmigwebdev@gmail.com>',
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for verification is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("OTP sent successfully");
    }
  });
};

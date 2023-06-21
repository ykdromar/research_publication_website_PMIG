const nodemailer = require("nodemailer");
const env = require("./env");
module.exports.sendOTP = async (email) => {
  const transporter = nodemailer.createTransport(env.SMTP);

  const otp = Math.floor(Math.random() * 9000 + 1000);

  const mailOptions = {
    from: "Research Publication Website, PMIG <pmigwebdev@gmail.com> ",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for verification on Research Publication Website, PMIG is: ${otp}`,
  };

  let info = await transporter.sendMail(mailOptions);

  return otp;
};

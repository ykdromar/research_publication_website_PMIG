require('dotenv').config()
const nodemailer = require('nodemailer')

const sendOTP = async (email) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_AUTH_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const otp = Math.floor(Math.random() * 10000 + 1)

  const mailOptions = {
    from: '"research_publication_website_PMIG👻" <pmigwebdev@gmail.com>', 
    to: email, 
    subject: 'OTP Verification', 
    text: `Your OTP for verification is: ${otp}`, 
    
  }

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('OTP sent successfully')
    }
  })
}


module.exports = sendOTP;
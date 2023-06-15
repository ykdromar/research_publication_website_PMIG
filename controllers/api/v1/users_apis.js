const User = require("../models/User");
const { sendOTP } = require("../config/nodemailerConfig.js");
const { use } = require("passport");

exports.createUser = async (req, res) => {
    const { username } = req.body;
  
    try {
      // Generate OTP and send it via email
      const otp = await sendOTP(username + "@iitk.ac.in");
  
      // Create and save the user in the database
      const newUser = new User({
        username,
        isVerified: false,
        OTP: otp,
      });
      await newUser.save();
  
      res.status(200).send("User created!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to create user!");
    }
  };
  

exports.verifyOTP = async (req, res) => {
    const { username, otp } = req.body;
  
    try {
      // Find the user in the database
      const user = await User.findOne({ username });
  
      // Check if user exists and OTP matches
      if (!user || user.OTP !== otp) {
        res.status(400).send("Invalid OTP or username.");
        return;
      }
  
      // Update isVerified to true
      user.isVerified = true;
      await user.save();
  
      res.status(200).send("OTP verified successfully.");
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to verify OTP.");
    }
  };

  exports.fatchUser = async (req, res) => {
    const { userid } = req.body;
      if (req.isAuthenticated()) {
        // User is logged in
        const user = await User.findOne({ userid });
        if(!user)
        {
          res.status(500).send("User not found!");
        }
        else{
          const data={
            "name": user.name,
            "username": user.username,
            "about":user.about
          }
          res.status(200).send(data);
        }
      } else {
        // User is not logged in
        res.status(500).send("You are not logged in!");
      }
  };
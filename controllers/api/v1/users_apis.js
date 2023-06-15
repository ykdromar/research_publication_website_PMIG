const User = require("../models/User");
const { sendOTP } = require("../config/nodemailerConfig.js");

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
  exports.editProfile=async(req,res)=>{
    try {
      //ensure that the user in logged in(authentication check)
      if(!req.User){
        return res.status(401).json({
          success: false,
          message:'Unauthorized.Please Log in.'
        });
      }
      //extract the updated user info from the request body
      const {name,about,password}=req.body;
      //update the user info in the database
      const updatedUser = await User.update(
      { name, about, password },
      { where: { id: req.user.id } }
      );
      //timeout 
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Prepare the JSON respone
      const response = {
        data: {
          name,
          about
        },
        success: true,
        statusCode: 200,
        message: 'User information updated successfully'
      };
      res.json(response);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        message: 'An Error occurred while editting user info'
      });
    }
  };

const User = require("../../../models/user");
const { sendOTP } = require("../../../config/nodemailerConfig");
const jwt = require("jsonwebtoken");
const env = require("../../../config/env");
module.exports.createUser = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user != null) {
      if (user.isVerified) {
        return res.status(200).json({
          statusCode: 409,
          success: false,
          data: {},
          message: "User already exists",
        });
      } else {
        const otp = await sendOTP(username + "@iitk.ac.in");
        user.otp = otp;
        user.save();
        return res.status(200).json({
          statusCode: 200,
          data: {
            username,
          },
          success: true,
          message: "OTP Sent Successfully",
        });
      }
    } else {
      const otp = await sendOTP(username + "@iitk.ac.in");
      const newUser = await User.create({
        username,
        isVerified: false,
        otp: otp,
      });
      if (newUser) {
        return res.status(200).json({
          statusCode: 200,
          data: {
            username,
          },
          success: true,
          message: "OTP Sent Successfully",
        });
      } else {
        return res.status(200).json({
          statusCode: 500,
          success: false,
          data: {},
          message: "Internal Server Error",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({
      statusCode: 500,
      success: false,
      data: {},
      message: "Internal Server Error",
    });
  }
};

module.exports.verifyOTP = async (req, res) => {
  try {
    const { username, otp } = req.body;

    // Find the user in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(200).json({
        statusCode: 401,
        message: "Invalid username/OTP",
        data: {},
        success: false,
      });
    } else {
      if (user.otp == otp) {
        user.isVerified = true;
        user.save();
        return res.status(200).json({
          statusCode: 200,
          message: "OTP Verified Successfully",
          data: {},
          success: true,
        });
      } else {
        return res.status(200).json({
          statusCode: 401,
          message: "Invalid username/OTP",
          data: {},
          success: false,
        });
      }
    }
  } catch (error) {
    return res.status(200).json({
      statusCode: 500,
      message: "Internal Server Error",
      data: {},
      success: false,
    });
  }
};

module.exports.signup = async (req, res) => {
  try {
    const { username, name, about, password, confirmPassword } = req.body;
    if (password != confirmPassword) {
      return res.status(200).json({
        statusCode: 400,
        message: "Password & Confirm Password not match",
        data: {},
        success: false,
      });
    }
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(200).json({
        statusCode: 404,
        message: "User not found ",
        data: {},
        success: false,
      });
    } else {
      if (user.isVerified) {
        user.name = name;
        user.about = about;
        user.password = password;
        user.save();
        return res.status(200).json({
          statusCode: 200,
          message: "Signed up successfully",
          data: {
            user: {
              username,
              name,
              about,
            },
          },
          success: true,
        });
      } else {
        return res.status(200).json({
          statusCode: 400,
          message: "User is not verified",
          data: {},
          success: false,
        });
      }
    }
  } catch (error) {
    return res.status(200).json({
      statusCode: 500,
      message: "Internal Server Error",
      data: {},
      success: false,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user || user.password != password) {
      return res.status(200).json({
        statusCode: 401,
        message: "Invalid username/Password",
        data: {},
        success: false,
      });
    } else {
      return res.status(200).json({
        statusCode: 200,
        message: "Logged in successfully",
        data: {
          user: {
            name: user.name,
            username: user.username,
            about: user.about,
          },
          token: jwt.sign(user.toJSON(), env.JWT_SECRET, {
            expiresIn: 3600000,
          }),
        },
        success: true,
      });
    }
  } catch (error) {
    return res.status(200).json({
      statusCode: 500,
      message: "Internal Server Error",
      data: {},
      success: false,
    });
  }
};

module.exports.editProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    let userId = req.user._id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(200).json({
        statusCode: 404,
        message: "User not found",
        data: {},
        success: false,
      });
    } else {
      if (name) {
        user.name = name;
      }
      if (about) {
        user.about = about;
      }
      user.save();
      return res.status(200).json({
        statusCode: 200,
        message: "User Info updated successfully",
        data: {
          user: {
            username: user.username,
            name: user.name,
            about: user.about,
          },
        },
        success: true,
      });
    }
  } catch (error) {
    return res.status(200).json({
      statusCode: 500,
      message: "Internal Server Error",
      data: {},
      success: false,
    });
  }
};

module.exports.fetchUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(200).json({
        statusCode: 404,
        message: "User not found",
        data: {},
        success: false,
      });
    } else {
      return res.status(200).json({
        statusCode: 200,
        message: "Fetched User info successfully",
        data: {
          user: {
            username: user.username,
            name: user.name,
            about: user.about,
          },
        },
        success: true,
      });
    }
  } catch (error) {
    return res.status(200).json({
      statusCode: 500,
      message: "Internal Server Error",
      data: {},
      success: false,
    });
  }
};

const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    sub: user._id,
    // any additional data
  };

  return jwt.sign(payload, "your-secret-key", { expiresIn: "1h" });
};

const login = async (req, res) => {

    try {
    const { username, password } = req.body
    if (!username || !password) {
      res.status(401).send('Please Provide Username and Password')
      return
    }

    const user = await User.findOne({ username })
    if (!user) {
      res.status(401).send('Invalid Username')
      return
    } else if (!user.isVerified) {
      res.status(400).send('Please Verify OTP')
      return
    }

    // a method created in user to compare the provided password in the req body and stored password in db
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      res.status(401).send('Invalid Credentials')
      return
    }

    //a jwt should be created and should be sent as response
    const token = generateToken(user)

    res.status(200).json({ token })
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to login.");
  }
};

module.exports = { login };

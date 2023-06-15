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
    const user = { _id: "user-id", username: "username" };

    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to login.");
  }
};

module.exports = { login };

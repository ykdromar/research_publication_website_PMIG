// routes/api/v1/users_route.js
const express = require("express");
const router = express.Router();
const usersApisController = require("../../../controllers/api/v1/users_apis");
const passport = require("passport");

// Send OTP route
router.post("/send-otp", usersApisController.createUser);

// Verify OTP route
router.post("/verify-otp", usersApisController.verifyOTP);

//signup route
router.post("/signup", usersApisController.signup);

// login route
router.post("/login", usersApisController.login);

//edit user profile route
router.put(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  usersApisController.editProfile
);

//Fetching user information
router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  usersApisController.fetchUser
);

module.exports = router;

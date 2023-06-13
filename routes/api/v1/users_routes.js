// routes/api/v1/users_route.js
const express = require('express');
const router = express.Router();
const usersApisController = require('../../../controllers/api/v1/users_apis');

// Send OTP route
router.post('/send-otp', usersApisController.sendOTP);

// Verify OTP route
router.post('/verify-otp', usersApisController.verifyOTP);

module.exports = router;

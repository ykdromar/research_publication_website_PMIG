const express = require("express");
const passport = require("passport");
const { login } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);

module.exports = router;

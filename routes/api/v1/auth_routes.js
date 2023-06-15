const express = require('express')
const router = express.Router()
const authApisController = require('../../../controllers/api/v1/auth_apis')

router.post('/login',authApisController.LoginUser);

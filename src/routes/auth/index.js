
const express = require('express');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

router.get('/shop/sign-up', authController.signUp);

module.exports = router
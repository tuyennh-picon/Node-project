
const express = require('express');
const authController = require('../../controllers/auth.controller');
const { asyncHandler } = require('../../auth/checkauth');

const router = express.Router();

router.post('/shop/sign-up', asyncHandler(authController.signUp));
router.post('/shop/sign-in', asyncHandler(authController.signIn));

module.exports = router
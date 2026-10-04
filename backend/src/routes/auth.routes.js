const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const authController = require('../controllers/auth.controller');
const {protect} = require('../middleware/auth.middleware');
const catchAsync = require('../utils/catchAsync');
const registerSchema = require('../validations/auth.validation');
const { loginSchema } = require('../validations/user.validation');
const validate = require('../middleware/validation.middleware');

router.post('/register',validate(registerSchema),catchAsync(authController.register));
router.post('/login', validate(loginSchema), catchAsync(authController.login));
router.post('/logout', catchAsync(authController.logout));
router.get('/getme',protect, catchAsync(authController.getMe));

module.exports = router;
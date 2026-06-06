const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const authController = require('../controllers/auth.controller');
const {protect} = require('../middleware/auth.middleware');

router.post('/register',authController.register);
router.post('/login',authController.login);
router.post('/logout', authController.logout);
router.get('/getme',protect, authController.getMe);

module.exports = router;
const express = require('express');
const router = express.Router();
const {protect,authorizeRoles} = require('../middleware/auth.middleware')
const dashboardController = require('../controllers/dashboard.controller')
const catchAsync = require('../utils/catchAsync')

router.get(
  "/analytics",
  protect,
  authorizeRoles('club'),
  catchAsync(dashboardController.Analytics)
);

module.exports = router;
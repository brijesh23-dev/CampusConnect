const express = require('express');
const router = express.Router();
const {protect,authorizeRoles} = require('../middleware/auth.middleware')
const dashboardController = require('../controllers/dashboard.controller')

router.get(
  "/analytics",
  protect,
  authorizeRoles('club'),
  dashboardController.Analytics
);

module.exports = router;
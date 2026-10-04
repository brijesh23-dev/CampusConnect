const express = require("express");
const router = express.Router();

const {
  getNotifications,
  markAsRead,
} = require("../controllers/notification.controller");

const { protect } = require("../middleware/auth.middleware");
const catchAsync = require("../utils/catchAsync");

router.get("/", protect, catchAsync(getNotifications));

router.put("/:id", protect, catchAsync(markAsRead));

module.exports = router;

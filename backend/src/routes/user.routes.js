const express = require("express");
const router = express.Router();

const { updateInterests, updateProfile, changePassword } = require("../controllers/user.controller");
const { protect, authorizeRoles } = require("../middleware/auth.middleware");
const catchAsync = require("../utils/catchAsync");

router.put("/interests", protect, authorizeRoles("student"), catchAsync(updateInterests));
router.put("/profile", protect, catchAsync(updateProfile));
router.put("/password", protect, catchAsync(changePassword));

module.exports = router;

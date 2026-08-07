const express = require("express");
const router = express.Router();

const { updateInterests, updateProfile, changePassword } = require("../controllers/user.controller");
const { protect, authorizeRoles } = require("../middleware/auth.middleware");

router.put("/interests", protect, authorizeRoles("student"), updateInterests);
router.put("/profile",  protect, updateProfile);
router.put("/password", protect, changePassword);

module.exports = router;

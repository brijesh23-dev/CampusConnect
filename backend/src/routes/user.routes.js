const express = require("express");
const router = express.Router();

const { updateInterests, updateProfile, changePassword } = require("../controllers/user.controller");
const { protect, authorizeRoles } = require("../middleware/auth.middleware");
const catchAsync = require("../utils/catchAsync");
const validate = require("../middleware/validation.middleware");
const {
  updateInterestsSchema,
  updateProfileSchema,
  changePasswordSchema,
} = require("../validations/user.validation");

router.put("/interests", protect, authorizeRoles("student"), validate(updateInterestsSchema), catchAsync(updateInterests));
router.put("/profile", protect, validate(updateProfileSchema), catchAsync(updateProfile));
router.put("/password", protect, validate(changePasswordSchema), catchAsync(changePassword));

module.exports = router;

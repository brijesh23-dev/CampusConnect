const router = require("express").Router();
const { protect, authorizeRoles } = require("../middleware/auth.middleware");
const { getAllClubs, getClubById, getClubProfile, updateClubProfile } = require("../controllers/club.controller");
const catchAsync = require("../utils/catchAsync");

// Public routes
router.get("/all", catchAsync(getAllClubs));

// Authenticated club-only routes (must come before /:id to avoid conflict)
router.get("/profile", protect, authorizeRoles("club"), catchAsync(getClubProfile));
router.put("/profile", protect, authorizeRoles("club"), catchAsync(updateClubProfile));

// Public single-club route
router.get("/:id", catchAsync(getClubById));

module.exports = router;

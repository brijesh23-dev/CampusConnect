const router = require("express").Router();
const { protect, authorizeRoles } = require("../middleware/auth.middleware");
const { getAllClubs, getClubById, getClubProfile, updateClubProfile } = require("../controllers/club.controller");

// Public routes
router.get("/all", getAllClubs);

// Authenticated club-only routes (must come before /:id to avoid conflict)
router.get("/profile", protect, authorizeRoles("club"), getClubProfile);
router.put("/profile", protect, authorizeRoles("club"), updateClubProfile);

// Public single-club route
router.get("/:id", getClubById);

module.exports = router;

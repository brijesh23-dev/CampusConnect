const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middleware/auth.middleware");
const adminController = require("../controllers/admin.controller");

const adminOnly = [protect, authorizeRoles("admin")];

router.get("/stats", ...adminOnly, adminController.getStats);
router.get("/users", ...adminOnly, adminController.getAllUsers);
router.delete("/users/:id", ...adminOnly, adminController.deleteUser);
router.patch("/users/:id/role", ...adminOnly, adminController.updateUserRole);
router.get("/events", ...adminOnly, adminController.getAllEvents);
router.delete("/events/:id", ...adminOnly, adminController.deleteAdminEvent);
router.get("/analytics", ...adminOnly, adminController.getPlatformAnalytics);

module.exports = router;

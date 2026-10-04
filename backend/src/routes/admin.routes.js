const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middleware/auth.middleware");
const adminController = require("../controllers/admin.controller");
const catchAsync = require("../utils/catchAsync");

const adminOnly = [protect, authorizeRoles("admin")];

router.get("/stats", ...adminOnly, catchAsync(adminController.getStats));
router.get("/users", ...adminOnly, catchAsync(adminController.getAllUsers));
router.delete("/users/:id", ...adminOnly, catchAsync(adminController.deleteUser));
router.patch("/users/:id/role", ...adminOnly, catchAsync(adminController.updateUserRole));
router.get("/events", ...adminOnly, catchAsync(adminController.getAllEvents));
router.delete("/events/:id", ...adminOnly, catchAsync(adminController.deleteAdminEvent));
router.patch("/events/:id/approve", ...adminOnly, catchAsync(adminController.approveEvent));
router.get("/analytics", ...adminOnly, catchAsync(adminController.getPlatformAnalytics));

module.exports = router;

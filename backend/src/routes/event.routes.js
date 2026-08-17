const router = require("express").Router();
const eventController = require("../controllers/event.controller");
const { protect, authorizeRoles } = require("../middleware/auth.middleware");
const { storage } = require("../config/CloudinaryConfig");
const multer = require("multer");

// Validate image MIME type before uploading to Cloudinary.
// This replaces allowed_formats in CloudinaryConfig (which caused Invalid Signature).
const imageUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files (jpg, png, gif, webp) are allowed"), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});


router.post(
  "/create",
  protect,
  authorizeRoles("club"),
  imageUpload.single("image"),
  eventController.createEvent,
);
router.get("/all", eventController.getAllEvents);
router.get(
  "/my-events",
  protect,
  authorizeRoles("club", "admin"),
  eventController.getMyevents,
);
router.put(
  "/update/:id",
  protect,
  authorizeRoles("club", "admin"),
  imageUpload.single("image"),
  eventController.updateEvent,
);
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("club", "admin"),
  eventController.deleteEvent,
);
router.post(
  "/:id/register",
  protect,
  authorizeRoles("student"),
  eventController.registerForEvent
);
router.get(
  "/:id/participants",
  protect,
  authorizeRoles("club", "admin"),
  eventController.getParticipants,
);
router.patch(
  "/:id/status",
  protect,
  authorizeRoles("club"),
  eventController.updateEventStatus,
);
// /:id must come LAST — it is a wildcard catch-all
router.get("/:id", eventController.getsingleEvent);

module.exports = router;
